import React from 'react';
import Style from './Home.module.scss';
import me from '../../resources/img/self.png';
import classNames from 'classnames';
import EmojiBullet from "./EmojiBullet";
import SocialIcon from "./SocialIcon";
import SocialIconSvg from "./SocialIconSvg";
import Chatbot from "./Chatbot";
import { Box, Chip } from "@mui/material";
import { info } from "../../resources/info/Info";

export default function Home() {

   return (
      <Box component={'main'} display={'flex'} flexDirection={'column'} alignItems={'center'}
         justifyContent={'center'} minHeight={'calc(100vh - 175px)'}>
         {/* Hero section */}
         <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={'center'}
            justifyContent={'center'}>
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

         {/* Chatbot section */}
         <Chatbot />

         {/* About section */}
         <Box className={Style.aboutSection} width={{ xs: '90%', md: '60%' }} mt={'2rem'} mb={'2rem'}>
            <Box className={Style.bioCard} p={{ xs: '1.5rem', md: '2rem' }} borderRadius={'1rem'}>
               <p className={Style.bioText}>{info.bio}</p>
            </Box>
         </Box>

         {/* Skills section */}
         <Box width={{ xs: '90%', md: '60%' }} mb={'3rem'}>
            <Box mb={'1.5rem'}>
               <h3 className={Style.skillsTitle}>Tech Stack</h3>
               <Box display={'flex'} flexWrap={'wrap'} gap={'0.6rem'} justifyContent={'center'} mt={'0.75rem'}>
                  {info.skills.proficientWith.map((skill, index) => (
                     <Chip
                        key={index}
                        label={skill}
                        className={Style.chipPrimary}
                        sx={{
                           background: `linear-gradient(135deg, ${info.baseColor}22, ${info.baseColor}44)`,
                           border: `1px solid ${info.baseColor}66`,
                           color: 'inherit',
                           fontWeight: 500,
                           fontSize: '0.9rem',
                           padding: '0.2rem 0.4rem',
                           '&:hover': {
                              background: `linear-gradient(135deg, ${info.baseColor}44, ${info.baseColor}66)`,
                           }
                        }}
                     />
                  ))}
               </Box>
            </Box>
            <Box>
               <h4 className={Style.skillsSubtitle}>Also worked with</h4>
               <Box display={'flex'} flexWrap={'wrap'} gap={'0.5rem'} justifyContent={'center'} mt={'0.5rem'}>
                  {info.skills.exposedTo.map((skill, index) => (
                     <Chip
                        key={index}
                        label={skill}
                        variant="outlined"
                        className={Style.chipSecondary}
                        sx={{
                           borderColor: 'currentColor',
                           color: 'inherit',
                           opacity: 0.6,
                           fontSize: '0.85rem',
                           '&:hover': { opacity: 0.9 }
                        }}
                     />
                  ))}
               </Box>
            </Box>
         </Box>
      </Box>
   )
}
