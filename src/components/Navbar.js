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
                <Box component={'li'} className={(links[0].active === active && !links[0].type) && Style.active}
                     sx={{borderImageSource: info.gradient}}>
                    <Link to={links[0].to} onClick={() => setActive(links[0].active)} className={Style.link}>
                        {!links[0].type && <p style={{padding: '0.5rem 0'}}>{links[0].name}</p>}
                        {links[0].type && <h1>{links[0].name}</h1>}
                    </Link>
                </Box>
                <Box className='initials' sx={{ borderImageSource: info.gradient }} padding={'10px'} width={'10%'} alignItems={'center'} textTransform={'lowercase'}>
                    <Link to={'/'} onClick={() => setActive('home')}>
                        <h1>{info.initials}</h1>
                    </Link>
                </Box>
                <Box component={'li'} className={(links[1].active === active && !links[1].type) && Style.active}
                     sx={{borderImageSource: info.gradient}}>
                    <Link to={links[1].to} onClick={() => setActive(links[1].active)} className={Style.link}>
                        {!links[1].type && <p style={{padding: '0.5rem 0'}}>{links[1].name}</p>}
                        {links[1].type && <h1>{links[1].name}</h1>}
                    </Link>
                </Box>
                <li>
                    <Toggler darkMode={darkMode} handleClick={handleClick}/>
                </li>
            </Box>
        </Box>
    )
}
