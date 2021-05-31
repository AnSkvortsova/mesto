import initialCards from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// переменные открытия и закрытия popup
const openPopupEdit = document.querySelector('.profile__edit-button');
const openPopupAdd = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const closePopupEdit = document.querySelector('#popup__edit-close');
const closePopupAdd = document.querySelector('#popup__add-close');
const closePopupImage = document.querySelector('#popup__img-close');

// переменные для работы с формой
const formEdit = document.querySelector('form[name="edit"]');
const formAdd = document.querySelector('form[name="add-card"]');

// переменные для работы с input попапа редактировать
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('#input-name');
const jobInput = document.querySelector('#input-job');

// переменная куда добовлять карточки
const elementsContainer = document.querySelector('.elements');



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


// функция закрытия попап по нажатию Esc
function heandleKey(evt) {
    if (evt.key === 'Escape') {
      const activePopup = document.querySelector('.popup_opend');
      closePopup(activePopup);
  }
}

// функция закрытия попап по клике на оверлей
function heandleOverlay(evt) {
    if(evt.target.classList.contains('popup_opend')) {
      const activePopup = document.querySelector('.popup_opend');
      closePopup(activePopup);
    }
}

// функции открытия и закрытия popup 
function openPopup(popupElement) {
  popupElement.classList.add('popup_opend');
  document.addEventListener('keydown', heandleKey);
  document.addEventListener('click', heandleOverlay);
}
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opend');
  document.removeEventListener('keydown', heandleKey);
  document.removeEventListener('click', heandleOverlay);
}

// перебор массива
initialCards.forEach((data) => {
  const newElement = new Card(data, '#card-template', openPopup);
  elementsContainer.append(newElement.generateCard());
});

// добавление карточки из popup
function handleSubmitFormAdd(evt){
  evt.preventDefault();
  
  const data = Object.fromEntries(new FormData(evt.target));
  const addElement = new Card(data, '#card-template', openPopup);
  elementsContainer.prepend(addElement.generateCard());
  
  closePopup(popupAdd);

  evt.target.reset();
}

// добавление изменений попапа редактировать
function handleSubmitFormEdit(evt){
  evt.preventDefault();

  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;

  closePopup(popupEdit);
}

// вызов функции открытия и закрытия popup 

openPopupEdit.addEventListener('click', () => {
  nameInput.value = title.textContent; 
  jobInput.value = subtitle.textContent;

  editFormValidator.clearErrorElements();
  editFormValidator.toggleButtonState();

  openPopup(popupEdit);
});

openPopupAdd.addEventListener('click', () => {
  formAdd.reset();

  addCardFormValidator.clearErrorElements();
  addCardFormValidator.toggleButtonState();

  openPopup(popupAdd);
});

closePopupEdit.addEventListener('click', () => closePopup(popupEdit));
closePopupAdd.addEventListener('click', () => closePopup(popupAdd));
closePopupImage.addEventListener('click',() =>  closePopup(popupImage));

// вызов функции сохранить попап
formEdit.addEventListener('submit', handleSubmitFormEdit);
formAdd.addEventListener('submit', handleSubmitFormAdd);
