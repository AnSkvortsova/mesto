import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupImage = this.popupElement.querySelector('.popup__image-big');
    this._popupText = this.popupElement.querySelector('.popup__text');
  }
  
  handleCardClick(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupText.textContent = data.name;
    super.openPopup();
    super.setEventListeners();
  }
}