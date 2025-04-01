import React, { useState } from 'react';
import Style from './Navbar.module.scss';
import Toggler from "./home/Toggler"; // Assuming Toggler is in './home/Toggler'
import { Link, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { info } from "../resources/info/Info"; // Assuming info is in '../resources/info/Info'

const leftLinks = [
    {
        name: 'Curriculum Vitae',
        to: '/about',
        active: 'about'
    }
];

const rightLinks = [
    {
        name: 'Demo',
        to: '/portfolio',
        active: 'portfolio'
    }
];

export default function Navbar({ darkMode, handleClick }) {
    const location = useLocation();
    // Initialize active state based on current location pathname
    const [active, setActive] = useState(() => {
        const path = location.pathname;
        if (path === '/') return 'home';
        // Remove leading slash for comparison
        const activePath = path.startsWith('/') ? path.substring(1) : path;
        // Check if current path matches any link's active state
        const allLinks = [...leftLinks, ...rightLinks];
        const matchedLink = allLinks.find(link => link.active === activePath);
        return matchedLink ? matchedLink.active : path.substring(1); // Fallback if no direct match
    });

    // Helper function to create link list items
    const renderLinks = (links) => links.map((link, index) => (
        <Box
            key={index}
            component={'li'}
            className={(link.active === active && !link.type) ? Style.active : ""} // Apply active style
            sx={{
                borderImageSource: info.gradient, // Apply gradient if needed by Style.active
                padding: 0, // Reset default li padding if necessary
                margin: 0,  // Reset default li margin if necessary
                listStyle: 'none' // Ensure no bullet points
            }}
        >
            <Link to={link.to} onClick={() => setActive(link.active)} className={Style.link}>
                {/* Use p for normal links, h1 for special types if defined */}
                {!link.type && <p style={{ padding: '0.5rem 0', margin: 0 }}>{link.name}</p>}
                {link.type && <h1>{link.name}</h1>}
            </Link>
        </Box>
    ));

    return (
        // Outer Nav container
        <Box component={'nav'} width={'100%'} sx={{ px: { xs: 1, md: 2 } }}> {/* Add some padding */}
            {/* Main Flex row: space-between pushes items to ends */}
            <Box
                display={'flex'}
                justifyContent={'space-between'} // Pushes Center Group and Toggler apart
                alignItems={'center'}
                width={'100%'}
                py={2} // Add vertical padding
            >
                {/* Centered Group: Links and Initials */}
                <Box
                    component={'ul'} // Use UL for semantic list container
                    display={'flex'}
                    justifyContent={'center'} // Center items within this group if needed (usually alignItems is enough)
                    alignItems={'center'}
                    gap={{ xs: '3rem', md: '7rem' }} // Controls spacing between links and initials
                    sx={{
                        padding: 0, // Reset default ul padding
                        margin: 0,  // Reset default ul margin
                        listStyle: 'none', // Ensure no bullet points
                        flexGrow: 1 // Allow this group to take available space if needed, helping center it
                    }}
                    fontSize={'1rem'}
                >
                    {/* Render Left Links */}
                    {renderLinks(leftLinks)}

                    {/* Initials Box */}
                    <Box
                        component={'li'} // Treat initials as a list item for structure
                        className={active === 'home' ? Style.active : ""} // Check if 'home' is active
                        sx={{
                             borderImageSource: info.gradient,
                             padding: 0,
                             margin: 0,
                             listStyle: 'none',
                             // Optionally add specific styles for initials container if needed
                        }}
                        padding={'0 10px'} // Adjust padding around initials if needed
                        alignItems={'center'}
                        textTransform={'lowercase'}
                    >
                        <Link to={'/'} onClick={() => setActive('home')} className={Style.link}>
                            {/* Ensure H1 style matches other links or has its own */}
                            <h1 style={{ margin: 0, padding: '0.5rem 0' }}>{info.initials}</h1>
                        </Link>
                    </Box>

                    {/* Render Right Links */}
                    {renderLinks(rightLinks)}
                </Box>

                {/* Toggler Box (will be pushed to the right) */}
                <Box display={'flex'} alignItems={'center'}> {/* Wrap toggler for alignment if needed */}
                    <Toggler darkMode={darkMode} handleClick={handleClick} />
                </Box>
            </Box>
        </Box>
    );
}