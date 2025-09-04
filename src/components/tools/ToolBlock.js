import React from 'react';
import IconLink from "../portfolio/IconLink";
import {Box} from "@mui/material";
import Style from "./ToolBlock.module.scss";

function ToolBlock(props) {
   const {image, url, title} = props;
   return (
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} className={Style.toolBlock}>
         {image && <Box component={'img'} src={image} alt={'mockup'}/>}
         <h1 style={{fontSize: '2rem'}}>{title}</h1>
         <Box className={'portfolio'} display={'flex'} flexDirection={'column'} gap={'0.5rem'}
              alignItems={'center'} fontSize={'1.5rem'} py={'2rem'}>
            <Box p={1} className={Style.button}>
               <IconLink link={url} title={'Visit Tool'} icon={'fa fa-wrench'}/>
            </Box>
         </Box>
      </Box>
   );
}

export default ToolBlock;
