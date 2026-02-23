// CRA dev server proxy — handles /api/arxiv locally during development
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
};
