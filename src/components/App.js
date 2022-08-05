import React from 'react';
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
// import PopupWithForm from "./PopupWithForm";
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import  { api } from '../utils/api';


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
    // const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() => {
        api.getUser()
        .then((userData) => {
            setCurrentUser(userData);
        })
        api.getInitialCards()
        .then((cardData) => {
            console.log(cardData);
            setCards(cardData);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);


    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(userUpdate) {
        api.changeUser({userName: userUpdate.name, userOccupation: userUpdate.about})
        .then((userData) => {
            setCurrentUser(userData);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleUpdateAvatar(avatarUpdate) {
        api.changeAvatar(avatarUpdate)
        .then((userData) => {
            setCurrentUser(userData);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })

    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card)
        .then((cardData) => {
            setCards([cardData, ...cards]);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        if(isLiked) {
            api.deleteLike(card._id).then((cardData) => {
            setCards((cards) => 
                cards.map((c) => (c._id === card._id ? cardData : c)))
        })
        .catch((err) => {console.log(err)})
        } else {
            api.addLike(card._id).then((cardData) => {
            setCards((cards) => 
                cards.map((c) => (c._id === card._id ? cardData : c)))
        })
        .catch((err) => {console.log(err)})
        }
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(() => {
            setCards((cards) => cards.filter((c) => c._id != card._id));
        })
        .catch((err) => {console.log(err)})
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsAvatarPopupOpen(false);
        // setIsConfirmDeletePopupOpen(false);
        setSelectedCard(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                cards={cards}
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                onDeleteCardClick={handleCardDelete}
                onCardImageClick ={handleCardClick}
                onCardLikeClick={handleCardLike}
                />
                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onUpdateUser={handleUpdateUser}
                    onClose={closeAllPopups}          
                />

                <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onAddPlaceSubmit={handleAddPlaceSubmit}
                onClose={closeAllPopups}
                />

                {/* <PopupWithForm
                title="Are you sure"
                name="delete"
                isOpen={isConfirmDeletePopupOpen}
                buttonText="Yes"
                onClose={closeAllPopups}
                >
                </PopupWithForm> */}

                <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onUpdateAvatar={handleUpdateAvatar}
                onClose={closeAllPopups}
                />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
