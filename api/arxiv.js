// Vercel serverless function — proxies Arxiv API requests to avoid CORS issues
export default async function handler(req, res) {
    try {
        const url = 'http://export.arxiv.org/api/query?search_query=au:"Florian+Valade"&sortBy=submittedDate&sortOrder=descending';
        const response = await fetch(url);
        if (!response.ok) {
            return res.status(response.status).json({ error: `Arxiv responded with ${response.status}` });
        }
        const text = await response.text();
        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
        res.status(200).send(text);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
