import './pages/pages.css';
import { initialCards } from './scripts/initial-cards.js';
import { Card } from './scripts/Card.js';
import { Section } from './scripts/Section.js';
import { FormValidator } from './scripts/FormValidator.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';

// переменные открытия popup
const openPopupEditProfile = document.querySelector('.profile__edit-button');
const openPopupAddCard = document.querySelector('.profile__add-button');

// переменные для работы с формой
const formEdit = document.querySelector('form[name="edit"]');
const formAdd = document.querySelector('form[name="add-card"]');


// валидация форм
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorActiveClass: 'popup__input-error_active',
}

const editFormValidator = new FormValidator(config, formEdit);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, formAdd);
addCardFormValidator.enableValidation();


// попапы
const userInfo = new UserInfo ({ titleElement: '.profile__title', subtitleElement: '.profile__subtitle'});

const popupEditProfile = new PopupWithForm({
  popupElement: '.popup_type_edit',
  handleSubmitForm: (profileData) => {
    userInfo.setUserInfo(profileData);
    popupEditProfile.closePopup();
  }
});

const popupAddCard = new PopupWithForm({
  popupElement: '.popup_type_add',
  handleSubmitForm: (cardData) => {
    cardsSection.addItem(cardData);
    popupAddCard.closePopup();
    }
});

const popupImageView = new PopupWithImage('.popup_type_image');


// отрисовка карточек
const cardsSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card(cardData, '#card-template', popupImageView.handleCardClick.bind(popupImageView));
    return card.generateCard();
  },
}, '.elements')

// вызов функции открытия и закрытия popup 

openPopupEditProfile.addEventListener('click', () => {
  
  popupEditProfile.setInitialValues(userInfo.getUserInfo());

  editFormValidator.clearErrorElements();
  editFormValidator.toggleButtonState();

  popupEditProfile.openPopup();
});

openPopupAddCard.addEventListener('click', () => {

  addCardFormValidator.clearErrorElements();
  addCardFormValidator.toggleButtonState();

  popupAddCard.openPopup();
});

popupEditProfile.closePopup();
popupAddCard.closePopup();
popupImageView.closePopup();
