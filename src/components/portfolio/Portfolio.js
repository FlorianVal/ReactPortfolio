import React from 'react';
import PortfolioBlock from './PortfolioBlock'
import EmbedBlock from './EmbedBlock';
import HFLinkCard from './HFLinkCard';
import PlatformLinkCard from './PlatformLinkCard';
import { Box, Typography } from "@mui/material";
import { info } from "../../resources/info/Info";

export default function Portfolio() {

    const papers = info.portfolio.filter(p => p.category === 'papier');
    const codeProjects = info.portfolio.filter(p => p.category === 'code');
    const demos = info.portfolio.filter(p => p.category === 'demo');

    const renderProjects = (projects) => {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                {projects.map((project, index) => (
                    <Box key={index} width="100%" display="flex" justifyContent="center">
                        {project.type === 'standard' ? (
                            <PortfolioBlock
                                image={project.image}
                                live={project.live}
                                source={project.source}
                                title={project.title}
                            />
                        ) : project.type === 'hf-link' ? (
                            <HFLinkCard
                                url={project.url}
                                title={project.title}
                            />
                        ) : project.type === 'custom-link' ? (
                            <PlatformLinkCard
                                url={project.url}
                                title={project.title}
                                platformName={project.platformName}
                                emoji={project.emoji}
                            />
                        ) : (
                            <EmbedBlock
                                url={project.url}
                                title={project.title}
                            />
                        )}
                    </Box>
                ))}
            </Box>
        );
    };

    const SectionTitle = ({ title }) => (
        <Typography
            variant="h4"
            align="center"
            sx={{
                mb: 2,
                mt: 4,
                fontWeight: 'bold',
                background: info.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
            }}
        >
            {title}
        </Typography>
    );

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt="2rem" mb="4rem" width="100%">
            {papers.length > 0 && (
                <Box width="100%" maxWidth="900px" mb={4}>
                    <Box display="flex" justifyContent="center">
                        <SectionTitle title="📄 Recherche & Papiers" />
                    </Box>
                    {renderProjects(papers)}
                </Box>
            )}

            {codeProjects.length > 0 && (
                <Box width="100%" maxWidth="900px" mb={4}>
                    <Box display="flex" justifyContent="center">
                        <SectionTitle title="💻 Projets Open Source & Code" />
                    </Box>
                    {renderProjects(codeProjects)}
                </Box>
            )}

            {demos.length > 0 && (
                <Box width="100%" maxWidth="900px" mb={4}>
                    <Box display="flex" justifyContent="center">
                        <SectionTitle title="🚀 Démos Interactives" />
                    </Box>
                    {renderProjects(demos)}
                </Box>
            )}
        </Box>
    );
};