import React from 'react';
import './Aegung_SpecialStore_CardText.scss';

const Aegung_SpecialStore_CardText = ({ title, description, align = 'left', descWidth }) => {
    return (
        <div className={`Aegung_cardText ${align === 'right' ? 'Aegung_cardText--right' : ''}`}>
            <h3 className="Aegung_cardText__title">{title}</h3>
            <p className="Aegung_cardText__desc" style={descWidth ? { width: descWidth } : undefined}>{description}</p>
        </div>
    );
};

export default Aegung_SpecialStore_CardText;