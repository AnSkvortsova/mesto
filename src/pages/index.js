import './index.css';
import { Card } from '../scripts/components/Card.js';
import { Section } from '../scripts/components/Section.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js';
import { renderLoading } from '../scripts/utils/utils.js';
import { PopupWithConfirm } from '../scripts/components/PopupWithConfirm.js';

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
    handleCardClick: () => {popupImageView.open(cardData)},
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
      popupRemoveCard.getData(card);
      popupRemoveCard.open();
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

// попапы
const popupEditProfile = new PopupWithForm({
  popupElement: '.popup_type_edit',
  handleSubmitForm: (profileData) => {
    renderLoading ('.popup_type_edit', true);

    api.pushUserInfo(profileData)
    .then((result) => {
      userInfo.setUserInfo(result);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading('.popup_type_edit', false)
    });
  }
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm({
  popupElement: '.popup_type_add',
  handleSubmitForm: (cardData) => {
    renderLoading ('.popup_type_add', true);

    api.pushNewCard(cardData)
    .then((result) => {
      cardsSection.addNewItem(createCard(result));
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading('.popup_type_add', false)
    });
    }
});
popupAddCard.setEventListeners();

const popupImageView = new PopupWithImage('.popup_type_image');
popupImageView.setEventListeners();

const popupRemoveCard = new PopupWithConfirm({
  popupElement: '.popup_type_delete',
  handleSubmitForm: (cardData) => {
    api.removeCard(cardData._data._id)
    .then(() => {
      cardData.removeCard();
      popupRemoveCard.close();
    })
    .catch((err) => {
      console.log(err);
    });
  }
});
popupRemoveCard.setEventListeners();

const popupAvatar = new PopupWithForm({
  popupElement: '.popup_type_avatar',
  handleSubmitForm: (avatarData) => {
    renderLoading ('.popup_type_avatar', true);
    api.updateAvatar(avatarData)
    .then((result) => {
      userInfo.setUserInfo(result);
      popupAvatar.close();
    })
    .finally(() => {
      renderLoading('.popup_type_avatar', false)
    });
  }
})
popupAvatar.setEventListeners();

// вызов функции открытия popup 

openPopupEditProfile.addEventListener('click', () => {
  
  popupEditProfile.setInitialValues(userInfo.getUserData());

  editFormValidator.clearErrorElements();
  editFormValidator.toggleButtonState();

  popupEditProfile.open();
});

openPopupAddCard.addEventListener('click', () => {

  addCardFormValidator.clearErrorElements();
  addCardFormValidator.toggleButtonState();

  popupAddCard.open();
});

openPopupAvatar.addEventListener('click', () => {

  avatarFormValidator.clearErrorElements();
  avatarFormValidator.toggleButtonState();

  popupAvatar.open();
})
