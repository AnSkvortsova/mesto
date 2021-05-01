// переменные открытия и закрытия popup
let openPopupEditButton = document.querySelector('.profile__edit-button');
let openPopupAddButton = document.querySelector('.profile__add-button');
let popupEdit = document.querySelector('.popup__edit');
let popupAdd = document.querySelector('.popup__add');
let closePopupEditButton = document.querySelector('#popup__edit-close');
let closePopupAddButton = document.querySelector('#popup__add-close');

let formEdit = document.querySelector('#popup__edit-container');
let formAdd = document.querySelector('#popup__add-container');

// переменные для работы с input попапа редактировать
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('#input-name');
let jobInput = document.querySelector('#input-job');

// переменная куда добовлять карточки
const elementsContainer = document.querySelector('.elements');

// переменные для работы с template
const cardTemplate = document.querySelector('#card-template');
const inputPlace = document.querySelector('#input-place');
const inputLink = document.querySelector('#input-link');

// функции открытия и закрытия popup

function openPopupEdit() {
  popupEdit.classList.add('popup_opend');
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
}

function openPopupAdd() {
  popupAdd.classList.add('popup_opend');
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
}

function closePopupEdit() {
  popupEdit.classList.remove('popup_opend');
}

function closePopupAdd() {
  popupAdd.classList.remove('popup_opend');
}

// вызов функции открытия и закрытия popup

openPopupEditButton.addEventListener('click', openPopupEdit);
openPopupAddButton.addEventListener('click', openPopupAdd);
closePopupEditButton.addEventListener('click', closePopupEdit);
closePopupAddButton.addEventListener('click', closePopupAdd);

// массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

// создание карточки
function createCard(cardPlace, cardLink) {
  const newElement = cardTemplate.content.querySelector('.element').cloneNode(true);

  const newLink = newElement.querySelector('.element__image').src = cardLink;
  const newPlace = newElement.querySelector('.element__text').innerText = cardPlace;
  
  return newElement;
}

// перебор массива
initialCards.forEach((item) => {
  const newElement = createCard(item.name, item.link);
  elementsContainer.append(newElement);
});

// добавление карточки из popup
function submitFormAdd(evt){
  evt.preventDefault();

  const valuePlace = inputPlace.value;
  const valueLink = inputLink.value;
  const addElement = createCard(valuePlace, valueLink);
  elementsContainer.prepend(addElement);
  
  closePopupAdd();
}

// добавление изменений попапа редактировать
function submitFormEdit(evt){
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  closePopupEdit();
}

// вызов функции сохранить попап
formEdit.addEventListener('submit', submitFormEdit);
formAdd.addEventListener('submit', submitFormAdd);