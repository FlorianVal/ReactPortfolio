const ARXIV_ENDPOINT = '/api/arxiv';
const CACHE_KEY = 'arxiv_papers_cache';

const parseArxivEntries = (xmlText) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const entries = Array.from(xmlDoc.getElementsByTagName('entry'));

    return entries.map(entry => {
        const title = entry.getElementsByTagName('title')[0]?.textContent?.replace(/\n/g, ' ').trim() || 'Untitled Paper';
        const idNode = entry.getElementsByTagName('id')[0]?.textContent;

        let url = idNode || '';
        if (url) {
            url = url.replace('http://', 'https://').replace(/v\d+$/, '');
        }
        const arxivId = url.split('/').pop();

        return {
            category: "papier",
            title: title,
            url: url,
            arxivId: arxivId,
            type: "custom-link",
            platformName: "Arxiv",
            emoji: "📄"
        };
    });
};

export const getCachedArxivPapers = () => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        try {
            return JSON.parse(cached);
        } catch (e) {
            return [];
        }
    }
    return [];
};

export const fetchArxivPapers = async () => {
    const response = await fetch(ARXIV_ENDPOINT);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    const papers = parseArxivEntries(text);
    localStorage.setItem(CACHE_KEY, JSON.stringify(papers));
    return papers;
};
