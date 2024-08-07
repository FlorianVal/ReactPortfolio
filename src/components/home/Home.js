import React from 'react';
import Style from './Home.module.scss';
import me from '../../resources/img/self.png';
import classNames from 'classnames';
import EmojiBullet from "./EmojiBullet";
import SocialIcon from "./SocialIcon";
import SocialIconSvg from "./SocialIconSvg";
import { Box } from "@mui/material";
import { info } from "../../resources/info/Info";

export default function Home() {

   return (
      <Box component={'main'} display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={'center'}
         justifyContent={'center'} minHeight={'calc(100vh - 175px)'}>
         <Box className={classNames(Style.avatar, Style.shadowed)} alt={'image of developer'} style={{ background: info.gradient }} component={'img'} src={me} width={{ xs: '28vh', md: '31.5vh' }}
            height={{ xs: '25.6vh', md: '28.8vh' }}
            borderRadius={'50%'} p={'0.75rem'} mb={{ xs: '1rem', sm: 0 }} mr={{ xs: 0, md: '2rem' }} />
         <Box>
            <h1>Hi, I'm <span style={{ background: info.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{info.firstName}</span><span className={Style.hand}>🤚</span>
            </h1>
            <h2>I'm {info.position}.</h2>
            <Box component={'ul'} p={'0.8rem'}>
               {info.miniBio.map((bio, index) => (
                  <EmojiBullet key={index} emoji={bio.emoji} text={bio.text} />
               ))}
            </Box>
            <Box display={'flex'} gap={'1.5rem'} justifyContent={'center'} alignItems={'center'}>
               {info.socials.map((social, index) => (
                  'icon' in social ?
                     <SocialIcon key={index} link={social.link} icon={social.icon} label={social.label} /> :
                     <SocialIconSvg key={index} link={social.link} iconPath={social.path} label={social.label} />
               ))}
            </Box>
         </Box>
      </Box>
   )
}