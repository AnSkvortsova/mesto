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

// переменные открытия и закрытия popup
const handleOpenPopupEdit = document.querySelector('.profile__edit-button');
const handleOpenPopupAdd = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const handleClosePopupEdit = document.querySelector('#popup__edit-close');
const handleClosePopupAdd = document.querySelector('#popup__add-close');
const handleClosePopupImage = document.querySelector('#popup__img-close');

// переменные для работы с формой
const handleFormEdit = document.querySelector('#popup__edit-container');
const handleFormAdd = document.querySelector('#popup__add-container');

// переменные для работы с input попапа редактировать
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('#input-name');
const jobInput = document.querySelector('#input-job');

// переменные для работы с input попапа добавить
const inputPlace = document.querySelector('#input-place');
const inputLink = document.querySelector('#input-link');

// переменные для popap-image
const newLinkPopup = document.querySelector('.popup__image-big');
const newPlacePopup = document.querySelector('.popup__text');

// переменные для работы с template
const cardTemplate = document.querySelector('#card-template');
const elementTemplate = cardTemplate.content.querySelector('.element');

// переменная куда добовлять карточки
const elementsContainer = document.querySelector('.elements');




// функции открытия и закрытия popup 

function openPopup(popup) {
  popup.classList.add('popup_opend');
}

function closePopup(popup) {
  popup.classList.remove('popup_opend');
}

function openPopupImage(cardPlace, cardLink) {
  openPopup(popupImage);
  newLinkPopup.src = cardLink;
  newLinkPopup.alt = cardPlace;
  newPlacePopup.textContent = cardPlace;
}

// функция удалить карточку
function removeCard(evt) {
  evt.target.closest('.element').remove();
}
// функция нравится карточка
function likeCard(evt) {
  evt.target.classList.toggle('element__heart_active');
}

// создание карточки
function createCard(cardPlace, cardLink) {
  const newElement = elementTemplate.cloneNode(true);

  const newLink = newElement.querySelector('.element__image');
  const newPlace = newElement.querySelector('.element__text');
  const handleDeleteCard = newElement.querySelector('.element__trash');
  const handleLikeClick = newElement.querySelector('.element__heart');

  newLink.src = cardLink;
  newLink.alt = cardPlace;
  newPlace.textContent = cardPlace;

  // вызов функции открытия popup-image
  newLink.addEventListener('click', () => openPopupImage(cardPlace, cardLink));

  // вызов функции удалить карточку
  handleDeleteCard.addEventListener('click', removeCard);

  // вызов функции нравится карточка
  handleLikeClick.addEventListener('click', likeCard);
  
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
  
  closePopup(popupAdd);
}

// добавление изменений попапа редактировать
function submitFormEdit(evt){
  evt.preventDefault();

  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;

  closePopup(popupEdit);
}

// вызов функции открытия и закрытия popup 

handleOpenPopupEdit.addEventListener('click', () => {
  nameInput.value = title.textContent; 
  jobInput.value = subtitle.textContent;
  openPopup(popupEdit)
});

handleOpenPopupAdd.addEventListener('click', () => {
  inputPlace.value = '';
  inputLink.value = '';
  openPopup(popupAdd)
});

handleClosePopupEdit.addEventListener('click', () => closePopup(popupEdit));
handleClosePopupAdd.addEventListener('click', () => closePopup(popupAdd));
handleClosePopupImage.addEventListener('click',() =>  closePopup(popupImage));

// вызов функции сохранить попап
handleFormEdit.addEventListener('submit', submitFormEdit);
handleFormAdd.addEventListener('submit', submitFormAdd);
