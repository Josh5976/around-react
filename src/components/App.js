import React from 'react';
import '../pages/index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(undefined);

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

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsAvatarPopupOpen(false);
        setIsConfirmDeletePopupOpen(false);
        setSelectedCard(undefined);
    }

    return (
        <div className="page">
            <Header />;
            <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onDeleteCardClick={() => {setIsConfirmDeletePopupOpen(true)}}
            onCardImageClick ={handleCardClick}/>;
            <Footer />;

            <PopupWithForm
                title="Edit profile"
                name="edit"
                isOpen={isEditProfilePopupOpen}
                buttonText="Save"
                onClose={closeAllPopups}          
            >
                <input className="form__info-input form__info-input_type_name" 
                required 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Name" 
                minLength="2" 
                maxLength="40" 
                />
                <span id="name-error"></span>
                <input className="form__info-input form__info-input_type_job" 
                required 
                type="text" 
                id="occupation" 
                name="occupation" 
                placeholder="Occupation" 
                minLength="2" 
                maxLength="200" 
                />
                <span id="occupation-error"></span>
            </PopupWithForm>

            <PopupWithForm
            title="New Place"
            name="post"
            isOpen={isAddPlacePopupOpen}
            buttonText="Create"
            onClose={closeAllPopups}
            >
                    <input className="form__info-input form__info-input_type_title" 
                    required 
                    type="text" 
                    id="title" 
                    name="name" 
                    placeholder="Title" 
                    minLength="1" 
                    maxLength="30"
                    />
                    <span id="title-error"></span>
                    <input className="form__info-input form__info-input_type_image" 
                    required 
                    type="url" 
                    id="image" 
                    name="link"  
                    placeholder="Image Link"
                    />
                    <span id="image-error"></span>
                
            </PopupWithForm>

            <PopupWithForm
            title="Are you sure"
            name="delete"
            isOpen={isConfirmDeletePopupOpen}
            buttonText="Yes"
            onClose={closeAllPopups}
            >
            </PopupWithForm>

            <PopupWithForm
            title="Change profile picture"
            name="avatar"
            isOpen={isEditAvatarPopupOpen}
            buttonText="Save"
            onClose={closeAllPopups}
            >
                <input className="form__info-input"
                required type="url"
                id="avatar"
                name="avatar"
                placeholder="Enter image url"
                />
                <span id="avatar-error"></span>
            </PopupWithForm>

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            
        </div>
    )



  
}

export default App;
