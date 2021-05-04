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



// переменные открытия и закрытия popup
const openPopupEditButton = document.querySelector('.profile__edit-button');
const openPopupAddButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup__edit');
const popupAdd = document.querySelector('.popup__add');
const popupImage = document.querySelector('.popup__image');
const closePopupEditButton = document.querySelector('#popup__edit-close');
const closePopupAddButton = document.querySelector('#popup__add-close');
const closePopupImageButton = document.querySelector('#popup__img-close');

// переменные для работы с формой
const formEdit = document.querySelector('#popup__edit-container');
const formAdd = document.querySelector('#popup__add-container');

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

function openPopupEdit() {
  popupEdit.classList.add('popup_opend');
  nameInput.value = title.textContent; 
  jobInput.value = subtitle.textContent;
}

function openPopupAdd() {
  popupAdd.classList.add('popup_opend');
}

function openPopupImage(cardPlace, cardLink) {
  popupImage.classList.add('popup_opend');
  newLinkPopup.src = cardLink;
  newPlacePopup.textContent = cardPlace;
}

function closePopupEdit() {
  popupEdit.classList.remove('popup_opend');
}

function closePopupAdd() {
  popupAdd.classList.remove('popup_opend');
}

function closePopupImage() {
  popupImage.classList.remove('popup_opend');
}

// вызов функции открытия и закрытия popup 

openPopupEditButton.addEventListener('click', openPopupEdit);
openPopupAddButton.addEventListener('click', openPopupAdd);
closePopupEditButton.addEventListener('click', closePopupEdit);
closePopupAddButton.addEventListener('click', closePopupAdd);
closePopupImageButton.addEventListener('click', closePopupImage);



// создание карточки
function createCard(cardPlace, cardLink) {
  const newElement = elementTemplate.cloneNode(true);

  const newLink = newElement.querySelector('.element__image');
  const newPlace = newElement.querySelector('.element__text');
  const removeCardButton = newElement.querySelector('.element__trash');
  const likeCardButton = newElement.querySelector('.element__heart');

  newLink.src = cardLink;
  newPlace.textContent = cardPlace;

  // вызов функции открытия popup-image
  newLink.addEventListener('click', function(){
    openPopupImage(cardPlace, cardLink);
  })

  // вызов функции удалить карточку
  function removeCard(evt) {
    evt.target.closest('.element').remove();
  }
  removeCardButton.addEventListener('click', removeCard);

  // вызов функции нравится карточка
  function likeCard(evt) {
    evt.target.classList.toggle('element__heart_active');
  }
  likeCardButton.addEventListener('click', likeCard);
  
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