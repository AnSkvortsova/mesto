import './index.css';
import { Card } from '../scripts/components/Card.js';
import { Section } from '../scripts/components/Section.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/Api.js';

const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '55170ba5-0ba4-4f9f-8430-310e36be1994',
    'Content-Type': 'application/json',
  }
}
const api = new Api(options);

// переменные открытия popup
const openPopupEditProfile = document.querySelector('.profile__edit-button');
const openPopupAddCard = document.querySelector('.profile__add-button');
const openPopupAvatar = document.querySelector('.profile__pencil');

// переменные для работы с формой
const formEdit = document.querySelector('form[name="edit"]');
const formAdd = document.querySelector('form[name="add-card"]');
const formAvatar = document.querySelector('form[name="avatar"]');


let myUserId = null;
let cardRemoved = {};


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

const avatarFormValidator = new FormValidator(config, formAvatar);
avatarFormValidator.enableValidation();


// информация о пользователе
const userInfo = new UserInfo ({
  titleElement: '.profile__title',
  subtitleElement: '.profile__subtitle',
  avatarElement: '.profile__image',
});

// карточки
const createCard = (cardData) => {
  const card = new Card({
    data: cardData, 
    myUserId: myUserId, 
    templateSelector: '#card-template', 
    handleCardClick: popupImageView.openPopup.bind(popupImageView),
    handleLikeCard: () => {
      api.setLikeCard(card._data._id, card.isLike())
      .then((result) => {
        card.setLikes(result);
      })
      .catch((err) => {
        console.log(err);
      })
    },
    handleRemoveCard: () => {
      popupRemoveCard.openPopup();
      cardRemoved = card;
    },
  });
  return card.generateCard();
}

const cardsSection = new Section({
  renderer: (cardData) => {
    cardsSection.addItem(createCard(cardData));
  },
}, '.elements'); 

Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
.then(([resultUserInfo, resultInitialCards]) => {
  userInfo.setUserInfo(resultUserInfo);
  myUserId = resultUserInfo._id;

  cardsSection.renderItems(resultInitialCards);
})
.catch((err) => {
  console.log(err);
});

// индикатор загрузки
function renderLoading (popupSelector, isLoading) {
  const popupElement = document.querySelector(popupSelector);
  const buttonSubmit = popupElement.querySelector('.popup__submit');
  if(isLoading) {
    buttonSubmit.textContent = 'Сохранение...';
  } else {
    buttonSubmit.textContent = 'Сохранить';
  }
}

// попапы
const popupEditProfile = new PopupWithForm({
  popupElement: '.popup_type_edit',
  handleSubmitForm: (profileData) => {
    renderLoading ('.popup_type_edit', true);

    api.pushUserInfo(profileData)
    .then((result) => {
      userInfo.setUserInfo(result);
      userInfo.setAvatar(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading('.popup_type_edit', false)
    });
    
    popupEditProfile.closePopup();
  }
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm({
  popupElement: '.popup_type_add',
  handleSubmitForm: (cardData) => {
    renderLoading ('.popup_type_add', true);

    api.pushNewCard(cardData)
    .then((result) => {
      cardsSection.addItem(createCard(result));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading('.popup_type_add', false)
    });
  
    popupAddCard.closePopup();
    }
});
popupAddCard.setEventListeners();

const popupImageView = new PopupWithImage('.popup_type_image');
popupImageView.setEventListeners();

const popupRemoveCard = new PopupWithForm({
  popupElement: '.popup_type_delete',
  handleSubmitForm: () => {
    api.removeCard(cardRemoved._data._id)
    .then(() => {
      cardRemoved.removeCard();
    })
    .catch((err) => {
      console.log(err);
    });

    popupRemoveCard.closePopup();
  }
});
popupRemoveCard.setEventListeners();

const popupAvatar = new PopupWithForm({
  popupElement: '.popup_type_avatar',
  handleSubmitForm: (avatarData) => {
    renderLoading ('.popup_type_avatar', true);
    api.updateAvatar(avatarData)
    .then((result) => {
      userInfo.setAvatar(result);
    })
    .finally(() => {
      renderLoading('.popup_type_avatar', false)
    });

    popupAvatar.closePopup();
  }
})
popupAvatar.setEventListeners();

// вызов функции открытия popup 

openPopupEditProfile.addEventListener('click', () => {
  
  popupEditProfile.setInitialValues(userInfo.getUserData());

  editFormValidator.clearErrorElements();
  editFormValidator.toggleButtonState();

  popupEditProfile.openPopup();
});

openPopupAddCard.addEventListener('click', () => {

  addCardFormValidator.clearErrorElements();
  addCardFormValidator.toggleButtonState();

  popupAddCard.openPopup();
});

openPopupAvatar.addEventListener('click', () => {

  avatarFormValidator.clearErrorElements();
  avatarFormValidator.toggleButtonState();

  popupAvatar.openPopup();
})
