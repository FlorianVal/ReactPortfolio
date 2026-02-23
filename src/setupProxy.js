// CRA dev server proxy — handles /api routes locally during development
const express = require('express');
const path = require('path');

module.exports = function (app) {
    app.get('/api/arxiv', async (req, res) => {
        try {
            const url = 'http://export.arxiv.org/api/query?search_query=au:"Florian+Valade"&sortBy=submittedDate&sortOrder=descending';
            const response = await fetch(url);
            const text = await response.text();
            res.set('Content-Type', 'application/xml');
            res.send(text);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    });

    // Chat API — load .env.local for HF_TOKEN in dev
    require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

    app.post('/api/chat', express.json(), async (req, res) => {
        const { SYSTEM_PROMPT } = require('../api/prompt.js');
        const token = process.env.HF_TOKEN;

        if (!token) {
            return res.status(503).json({ error: 'HF_TOKEN not configured in .env.local' });
        }

        try {
            const { messages } = req.body;
            if (!messages || !Array.isArray(messages) || messages.length === 0) {
                return res.status(400).json({ error: 'Messages are required' });
            }

            const recentMessages = messages.slice(-20);

            const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'google/gemma-3n-E4B-it:together',
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        ...recentMessages,
                    ],
                    stream: true,
                    max_tokens: 512,
                    temperature: 0.7,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => 'Unknown error');
                console.error(`HF API error ${response.status}: ${errorText}`);
                return res.status(503).json({ error: 'Chat service is currently unavailable' });
            }

            // Stream SSE response
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache, no-transform');
            res.setHeader('Connection', 'keep-alive');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let assistantContent = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop();

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || !trimmed.startsWith("data: ")) continue;

                    const data = trimmed.slice(6);
                    if (data === '[DONE]') {
                        res.write('data: [DONE]\n\n');
                        continue;
                    }

                    try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices?.[0]?.delta?.content;
                        if (content) {
                            assistantContent += content;
                            res.write(`data: ${JSON.stringify({ content })}\n\n`);
                        }
                    } catch {
                        // Skip unparseable chunks
                    }
                }
            }

            // Log the interaction to Supabase
            const supabaseUrl = process.env.SUPABASE_URL;
            const supabaseKey = process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY;
            if (supabaseUrl && supabaseKey && assistantContent) {
                try {
                    const userQuestion = recentMessages[recentMessages.length - 1]?.content || "Unknown question";
                    await fetch(`${supabaseUrl}/rest/v1/chat_logs`, {
                        method: 'POST',
                        headers: {
                            'apikey': supabaseKey,
                            'Authorization': `Bearer ${supabaseKey}`,
                            'Content-Type': 'application/json',
                            'Prefer': 'return=minimal'
                        },
                        body: JSON.stringify({
                            user_question: userQuestion,
                            bot_answer: assistantContent
                        })
                    });
                } catch (err) {
                    console.error("Failed to log to Supabase:", err);
                }
            }

            res.end();
        } catch (error) {
            console.error('Chat API error:', error);
            if (!res.headersSent) {
                return res.status(500).json({ error: 'Chat service is currently unavailable' });
            }
            res.write(`data: ${JSON.stringify({ error: 'Stream interrupted' })}\n\n`);
            res.end();
        }
    });
};
