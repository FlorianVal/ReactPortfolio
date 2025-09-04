import React from 'react';
import ToolBlock from './ToolBlock';
import { Box, Grid } from "@mui/material";
import { info } from "../../resources/info/Info";

export default function Tool() {
    return (
        <Box>
            <Grid container display={'block'} justifyContent={'center'}>
                {info.tools.map((project, index) => (
                    <Grid item key={index}>
                        <ToolBlock
                            image={project.image}
                            url={project.url}
                            title={project.title}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
