// переменные открытия и закрытия popup
let openPopupEditButton = document.querySelector('.profile__edit-button');
let openPopupAddButton = document.querySelector('.profile__add-button');
let popupEdit = document.querySelector('.popup__edit');
let popupAdd = document.querySelector('.popup__add');
let closePopupEditButton = document.querySelector('#popup__edit-close');
let closePopupAddButton = document.querySelector('#popup__add-close');

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


let formEdit = document.querySelector('#popup__edit-container');
let formAdd = document.querySelector('#popup__add-container');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('#input-name');
let jobInput = document.querySelector('#input-job');


// функция редактирования информации о себе

function submitFormEdit(evt){
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  closePopupEdit();
}

function submitFormAdd(evt){
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  closePopupAdd();
}


formEdit.addEventListener('submit', submitFormEdit);
formAdd.addEventListener('submit', submitFormAdd);
