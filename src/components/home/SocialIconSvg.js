import React from 'react';

function SocialIconSvg(props) {
    const {link, iconPath, label} = props;
    return (
        <a target="_blank" aria-label={label}
           rel="noopener noreferrer" href={link}>
            <img src={iconPath} alt={label} style={{ width: '40px', height: '40px', display: 'inline-block', objectFit: 'contain' }} />
        </a>
    );
}

export default SocialIconSvg;