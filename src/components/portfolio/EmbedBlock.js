import React, { useRef, useEffect } from 'react';
import { Box, Backdrop } from "@mui/material";
import HFCard from './HFCard';


function EmbedBlock({ url, title }) {
    const [open, setOpen] = React.useState(false);
    const gradioAppRef = useRef(null);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [open]);

    const handleClose = (event) => {
        if (gradioAppRef.current && !gradioAppRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"
            borderRadius="0.5rem" mb="4rem" mt="2rem">
            <div className="p-4 w-full max-w-md">
                <HFCard title={title} emoji="⚡" onClick={handleOpen} />
            </div>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    overflow: 'auto',
                }}
                open={open}
                onClick={handleClose}
            >
                <div ref={gradioAppRef} style={{ maxHeight: '90vh', overflowY: 'auto', padding: '0 15% 0 15%' }}>
                    <gradio-app src={url}></gradio-app>
                </div>
            </Backdrop>
        </Box>
    );
}

export default EmbedBlock;