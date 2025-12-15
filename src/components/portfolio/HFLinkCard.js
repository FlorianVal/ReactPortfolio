import React from 'react';
import { Box } from "@mui/material";
import HFCard from './HFCard';

function HFLinkCard({ url, title }) {
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"
            borderRadius="0.5rem" mb="4rem" mt="2rem">
            <Box sx={{ padding: '1rem', width: '100%', maxWidth: 'md' }}>
                <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                >
                    <HFCard title={title} emoji="⚡" />
                </a>
            </Box>
        </Box>
    );
}

export default HFLinkCard;
