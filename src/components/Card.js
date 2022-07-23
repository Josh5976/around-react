import React from 'react';

function Card({ card, onCardClick, onDeleteCardClick }) {
    function handleClick() {
        onCardClick(card);
    }

    return (
       <div className="card">
            <button 
                className="card__trash" 
                type="button" 
                onClick={onDeleteCardClick}>
            </button>
            <img 
                className="card__image" 
                src={card.link} 
                onClick={handleClick}
            />
            <div className="card__info">
                <h2 className="card__info-title"></h2>
                <div className="card__info-container">
                    <button className="card__info-button" type="button"></button>
                    <h3 className="card__info-likes">{card.likes.length}</h3>
                </div>
            </div>
       </div>
    );
}

export default Card;