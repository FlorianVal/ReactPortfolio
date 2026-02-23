import React, { useState, useRef, useEffect, useCallback } from "react";
import Style from "./Chatbot.module.scss";
import { info } from "../../resources/info/Info";

const INITIAL_MESSAGE = {
    role: "assistant",
    content: `Salut ! 👋 Je suis Florian. Pose-moi n'importe quelle question sur mon parcours, mes projets ou mes compétences !`,
};

export default function Chatbot() {
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isUnavailable, setIsUnavailable] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading || isUnavailable) return;

        const userMessage = { role: "user", content: trimmed };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        // Prepare API messages (exclude the initial greeting)
        const apiMessages = newMessages
            .filter((_, i) => i !== 0)
            .map((m) => ({ role: m.role, content: m.content }));

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: apiMessages }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const contentType = response.headers.get("content-type") || "";

            if (contentType.includes("text/event-stream")) {
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let buffer = "";
                let assistantContent = "";

                setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split("\n");
                    buffer = lines.pop();

                    for (const line of lines) {
                        const trimmedLine = line.trim();
                        if (!trimmedLine || !trimmedLine.startsWith("data: ")) continue;

                        const data = trimmedLine.slice(6);
                        if (data === "[DONE]") continue;

                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.error) {
                                throw new Error(parsed.error);
                            }
                            if (parsed.content) {
                                assistantContent += parsed.content;
                                setMessages((prev) => {
                                    const updated = [...prev];
                                    updated[updated.length - 1] = {
                                        role: "assistant",
                                        content: assistantContent,
                                    };
                                    return updated;
                                });
                            }
                        } catch (e) {
                            if (e.message === "Stream interrupted") throw e;
                        }
                    }
                }

                if (!assistantContent) {
                    throw new Error("Empty response");
                }
            } else {
                const data = await response.json();
                if (data.error) throw new Error(data.error);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setIsUnavailable(true);
            setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last.role === "assistant" && !last.content) {
                    return prev.slice(0, -1);
                }
                return prev;
            });
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Désolé, je ne suis pas disponible pour le moment. Réessaie plus tard ! 😅",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={Style.chatSection}>
            <h3 className={Style.chatTitle}>
                <span className={Style.chatTitleIcon}>💬</span> Discute avec moi
            </h3>

            <div className={Style.chatCard}>
                <div className={Style.messagesContainer}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`${Style.message} ${msg.role === "user" ? Style.userMessage : Style.botMessage
                                }`}
                        >
                            <div className={Style.messageBubble}>{msg.content}</div>
                        </div>
                    ))}
                    {isLoading &&
                        messages[messages.length - 1]?.role !== "assistant" && (
                            <div className={`${Style.message} ${Style.botMessage}`}>
                                <div className={`${Style.messageBubble} ${Style.typing}`}>
                                    <span className={Style.dot} />
                                    <span className={Style.dot} />
                                    <span className={Style.dot} />
                                </div>
                            </div>
                        )}
                    <div ref={messagesEndRef} />
                </div>

                <div className={Style.inputArea}>
                    <div className={Style.inputWrapper}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={
                                isUnavailable
                                    ? "Florian est indisponible pour discuter 😴"
                                    : "Pose une question..."
                            }
                            disabled={isLoading || isUnavailable}
                            className={Style.chatInput}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || isUnavailable || !input.trim()}
                            className={Style.sendButton}
                            aria-label="Envoyer"
                            style={{ background: info.gradient }}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            </div>

            <p className={Style.disclaimer}>
                ⚠️ Ceci est un LLM — les réponses ne reflètent pas nécessairement mes
                idées.
            </p>
        </div>
    );
}
