import React from 'react';
import PortfolioBlock from './PortfolioBlock'
import EmbedBlock from './EmbedBlock';
import HFLinkCard from './HFLinkCard';
import { Box, Grid } from "@mui/material";
import { info } from "../../resources/info/Info";

export default function Portfolio() {
    return (
        <Box>
            <Grid container display={'block'} justifyContent={'center'}>
                {info.portfolio.map((project, index) => (
                    <Grid item key={index}>
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
                        ) : (
                            <EmbedBlock
                                url={project.url}
                                title={project.title}
                            />
                        )}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};