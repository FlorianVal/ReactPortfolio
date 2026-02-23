import React, { useState, useEffect } from 'react';
import PortfolioBlock from './PortfolioBlock'
import EmbedBlock from './EmbedBlock';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemButton, ListItemIcon, ListItemText, CircularProgress } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { info } from "../../resources/info/Info";
import { fetchArxivPapers, getCachedArxivPapers } from '../../utils/arxivApi';

const extractIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 1].replace(/\.pdf$/, '').split('v')[0];
};

const mergePapers = (arxivPapers) => {
    const staticPapers = info.portfolio.filter(p => p.category === 'papier');
    const staticIds = new Set(staticPapers.map(p => extractIdFromUrl(p.url)));
    const newArxivPapers = arxivPapers.filter(p => !staticIds.has(p.arxivId));
    return [...staticPapers, ...newArxivPapers];
};

export default function Portfolio() {

    const [expanded, setExpanded] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    // Initialize immediately with static + cached data
    const [papers, setPapers] = useState(() => mergePapers(getCachedArxivPapers()));

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(prev => ({ ...prev, [panel]: isExpanded }));
    };

    // Then fetch fresh data from Arxiv in the background
    useEffect(() => {
        let isMounted = true;
        const refreshPapers = async () => {
            setRefreshing(true);
            try {
                const arxivPapers = await fetchArxivPapers();
                if (isMounted) {
                    setPapers(mergePapers(arxivPapers));
                }
            } catch (e) {
                console.warn("Could not refresh papers from Arxiv, using cached data.", e);
            } finally {
                if (isMounted) {
                    setRefreshing(false);
                }
            }
        };
        refreshPapers();
        return () => { isMounted = false; };
    }, []);

    const codeProjects = info.portfolio.filter(p => p.category === 'code');
    const demos = info.portfolio.filter(p => p.category === 'demo');

    // Simple clickable list rows (for papers and code)
    const renderLinks = (projects) => (
        <List disablePadding>
            {projects.map((project, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                        component="a"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            borderRadius: '0.5rem',
                            border: '1px solid rgba(128,128,128,0.2)',
                            color: 'inherit',
                            '&:hover': {
                                borderColor: info.baseColor,
                                backgroundColor: 'rgba(128,128,128,0.08)',
                            },
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <Typography fontSize="1.2rem">{project.emoji || '📄'}</Typography>
                        </ListItemIcon>
                        <ListItemText
                            primary={project.title}
                            secondary={project.platformName}
                            primaryTypographyProps={{ fontWeight: 500, color: 'inherit' }}
                            secondaryTypographyProps={{ color: 'inherit', opacity: 0.5, fontSize: '0.8rem' }}
                        />
                        <OpenInNewIcon sx={{ color: 'inherit', opacity: 0.4, fontSize: '1rem', ml: 1 }} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );

    // Cards layout for demos (HF cards, custom cards, etc.)
    const renderCards = (projects) => (
        <Box display="flex" flexDirection="column" gap={2} width="100%">
            {projects.map((project, index) => (
                <Box key={index} width="100%">
                    {project.type === 'standard' ? (
                        <PortfolioBlock
                            image={project.image}
                            live={project.live}
                            source={project.source}
                            title={project.title}
                        />
                    ) : project.type === 'hf-link' ? (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <Box sx={{
                                borderRadius: '0.75rem',
                                overflow: 'hidden',
                                background: 'linear-gradient(to bottom right, #9333ea, #db2777)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '8rem',
                                cursor: 'pointer',
                                position: 'relative',
                                '&:hover': { filter: 'brightness(1.1)' },
                                transition: 'filter 0.2s ease',
                            }}>
                                <Typography sx={{
                                    color: '#eff6ff',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    textAlign: 'center',
                                    zIndex: 1,
                                    textShadow: '0px 1px 2px rgba(0,0,0,0.25)',
                                }}>
                                    ⚡ {project.title}
                                </Typography>
                                <Box sx={{
                                    position: 'absolute',
                                    top: 8, left: 8,
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: '0.25rem',
                                    px: 0.5, py: 0.25,
                                }}>
                                    <Typography sx={{ color: 'white', fontSize: '0.7rem', fontFamily: 'monospace', opacity: 0.8 }}>
                                        Running on <b style={{ fontStyle: 'oblique' }}>HuggingFace</b>
                                    </Typography>
                                </Box>
                            </Box>
                        </a>
                    ) : project.type === 'custom-link' ? (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <Box sx={{
                                borderRadius: '0.75rem',
                                overflow: 'hidden',
                                background: 'linear-gradient(to bottom right, #9333ea, #db2777)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '8rem',
                                cursor: 'pointer',
                                position: 'relative',
                                '&:hover': { filter: 'brightness(1.1)' },
                                transition: 'filter 0.2s ease',
                            }}>
                                <Typography sx={{
                                    color: '#eff6ff',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    textAlign: 'center',
                                    zIndex: 1,
                                    textShadow: '0px 1px 2px rgba(0,0,0,0.25)',
                                }}>
                                    {project.emoji} {project.title}
                                </Typography>
                                <Box sx={{
                                    position: 'absolute',
                                    top: 8, left: 8,
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: '0.25rem',
                                    px: 0.5, py: 0.25,
                                }}>
                                    <Typography sx={{ color: 'white', fontSize: '0.7rem', fontFamily: 'monospace', opacity: 0.8 }}>
                                        {project.platformName}
                                    </Typography>
                                </Box>
                            </Box>
                        </a>
                    ) : (
                        <EmbedBlock url={project.url} title={project.title} />
                    )}
                </Box>
            ))}
        </Box>
    );

    const SectionAccordion = ({ id, title, emoji, projects, renderFn, isLoading }) => {
        if ((!projects || projects.length === 0) && !isLoading) return null;

        return (
            <Accordion
                expanded={!!expanded[id]}
                onChange={handleChange(id)}
                disableGutters
                sx={{
                    background: 'transparent',
                    color: 'inherit',
                    boxShadow: 'none',
                    '&:before': { display: 'none' },
                    borderBottom: '1px solid rgba(128,128,128,0.2)',
                    '&.Mui-expanded': { margin: 0 },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'currentcolor', opacity: 0.6 }} />}
                    aria-controls={`${id}-content`}
                    id={`${id}-header`}
                    sx={{
                        color: 'inherit',
                        py: 1,
                        '& .MuiAccordionSummary-content': { margin: '8px 0' },
                        '&.Mui-expanded': { minHeight: 'unset' },
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <Typography fontSize="1.5rem">{emoji}</Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: 'inherit',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            {title}
                        </Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 1, pb: 3, color: 'inherit' }}>
                    {renderFn(projects)}
                    {isLoading && (
                        <Box display="flex" justifyContent="center" py={1}>
                            <CircularProgress size={18} color="inherit" sx={{ opacity: 0.4 }} />
                        </Box>
                    )}
                </AccordionDetails>
            </Accordion>
        );
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt="2rem" mb="4rem" width="100%"
            minHeight="calc(100vh - 175px)" sx={{ color: 'inherit' }}>
            <Box width="100%" maxWidth="800px" px={2}>
                <SectionAccordion id="panel-papier" title="Recherche & Papiers" emoji="📄" projects={papers} renderFn={renderLinks} isLoading={refreshing} />
                <SectionAccordion id="panel-code" title="Projets Open Source" emoji="💻" projects={codeProjects} renderFn={renderLinks} />
                <SectionAccordion id="panel-demo" title="Démos Interactives" emoji="🚀" projects={demos} renderFn={renderCards} />
            </Box>
        </Box>
    );
};