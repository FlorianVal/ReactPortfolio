
import React from 'react';
import './HFCard.scss'; // Reuse the same styles

const PlatformCard = ({ title, emoji, platformName, onClick }) => {
    return (
        <article className="hf-card">
            <div
                onClick={onClick}
                className="hf-card__inner"
                role="button"
                tabIndex={0}
            >
                <div className="hf-card__overlay"></div>

                <div className="hf-card__badge">
                    <div className="hf-card__badge-inner">
                        <div className="hf-card__badge-inner-text">
                            <span className="platform">{platformName}</span>
                        </div>
                    </div>
                </div>

                <div className="hf-card__emoji">{emoji}</div>

                <h4 className="hf-card__title">
                    {title}
                </h4>
            </div>
        </article>
    );
};

export default PlatformCard;
