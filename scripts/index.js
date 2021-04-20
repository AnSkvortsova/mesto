let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('#input-name');
let jobInput = document.querySelector('#input-job');

// функции открытия и закрытия popup

function openPopup() {
  popup.classList.add('popup_opend');
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opend');
}

// функция редактирования информации о себе

function submitForm(evt){
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  closePopup();
}

openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', submitForm);
