import React, {useState} from 'react';
import Style from './Navbar.module.scss';
import Toggler from "./home/Toggler";
import {Link, useLocation} from "react-router-dom";
import {Box} from "@mui/material";
import {info} from "../resources/info/Info";

const links = [
    /*{
        name: 'Home',
        to: '/',
        active: 'home'
    },
    {
        name: 'About Me',
        to: '/about',
        active: 'about'
    },
    {
        name: 'Portfolio',
        to: '/portfolio',
        active: 'portfolio'
    }*/
]

export default function Navbar({darkMode, handleClick}) {
    const location = useLocation()
    const [active, setActive] = useState(location.pathname === '/' ? 'home' : location.pathname.slice(1, location.pathname.length));

    return (
        <Box component={'nav'} width={'100%'} display={'flex'} justifyContent={'space-between'}>
            <Box component={'ul'} padding={'10px'} width={'45%'}
                gap={{ xs: '2rem', md: '8rem' }}
                textTransform={'lowercase'} fontSize={'1rem'} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                {links.map((link, index) => (
                    <Box key={index} className={(link.active === active && !link.type) && Style.active}
                        sx={{ borderImageSource: info.gradient }}>
                        <Link to={link.to} onClick={() => setActive(link.active)}>
                            {!link.type && <p style={{ paddingBottom: '0.5rem' }}>{link.name}</p>}
                            {link.type && <h1>{link.name}</h1>}
                        </Link>
                    </Box>
                ))}
            </Box>
            <Box className='initials' sx={{ borderImageSource: info.gradient }} padding={'10px'} width={'10%'} alignItems={'center'} textTransform={'lowercase'}>
                <Link to={'/'} onClick={() => setActive('home')}>
                    <h1>{info.initials}</h1>
                </Link>
            </Box>
            <Box className={Style.toggler} padding={'10px'} width={'45%'} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                <Toggler darkMode={darkMode} handleClick={handleClick} />
            </Box>
        </Box>
    )
}