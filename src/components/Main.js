import React from 'react';
// import api from "../utils.api";
import Card from "./Card";
import editAvatarButton from '../images/edit_profile_image.svg';
import {api} from '../utils/api';


function Main({
    onEditProfileClick,
    onAddPlaceClick,
    onEditAvatarClick,
    onDeleteCardClick,
    onCardImageClick,
}) {
    const [userName, setUserName] = React.useState("");
    const [userDesciption, setUserDesciption] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUser().then((userData) =>{
            setUserName(userData.name);
            setUserDesciption(userData.about);
            setUserAvatar(userData.avatar);
        });

        api.getInitialCards().then((cardData) => {
            setCards(cardData);
        });
    }, []);

    const imageStyle = {backgroundImage: `url(${userAvatar})`};

    return (
        <main className="page__content">
            <section className="profile">
                <div className="profile__avatar profile__avatar_container">
                    <div style={imageStyle} className="profile__avatar-image" alt="profile image" />
                    <div className="profile__avatar-overlay">
                        <img src={editAvatarButton} 
                        className="profile__avatar-overlay-image" 
                        alt="edit avatar button" 
                        onClick={onEditAvatarClick} 
                        />
                    </div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__info-title">{userName}</h1>
                    <button className="profile__info-button" type="button" onClick={onEditProfileClick}></button>
                    <p className="profile__info-subtitle">{userDesciption}</p>
                </div>
                <button className="profile__button" type="button" onClick={onAddPlaceClick}></button>
            </section>
            <section className="elements" id="elements">
                
                {cards.map((card, i) => 
                <Card key={i} card={card} 
                onCardClick={onCardImageClick}
                onDeleteClick={onDeleteCardClick} />
                )}
            </section>
        </main>
    )
}

export default Main;
