let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('#input-name');
let jobInput = document.querySelector('#input-job');

function togglePopup(){
  popup.classList.toggle('popup_opend');
}

function formSubmitHandler(evt){
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  popup.classList.remove('popup_opend');
}

openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);
