import React, {useState} from 'react';
import Style from './Navbar.module.scss';
import Toggler from "./home/Toggler";
import {Link, useLocation} from "react-router-dom";
import {Box} from "@mui/material";
import {info} from "../resources/info/Info";

const links = [
    {
        name: 'Curriculum Vitae',
        to: '/about',
        active: 'about'
    },
    {
        name: 'FV',
        to: '/',
        active: 'home',
        type: 'initials'
    },
    {
        name: 'Demo',
        to: '/portfolio',
        active: 'portfolio'
    }
]

export default function Navbar({darkMode, handleClick}) {
    const location = useLocation()
    const [active, setActive] = useState(location.pathname === '/' ? 'home' : location.pathname.slice(1, location.pathname.length));

    return (
        <Box component={'nav'} width={'100%'}>
            <Box component={'ul'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}
                 gap={{xs: '2rem', md: '8rem'}}
                 fontSize={'1rem'}>
                {links.map((link, index) => (
                    <Box component={'li'} key={index} className={(link.active === active && !link.type) && Style.active}
                         sx={{borderImageSource: info.gradient}}>
                        <Link to={link.to} onClick={() => setActive(link.active)} className={link.type ? Style.initials : Style.link}>
                            {!link.type && <p style={{padding: '0.5rem 0'}}>{link.name}</p>}
                            {link.type && <h1>{link.name}</h1>}
                        </Link>
                    </Box>
                ))}
                <li className={Style.toggler}>
                    <Toggler darkMode={darkMode} handleClick={handleClick}/>
                </li>
            </Box>
        </Box>
    )
}
