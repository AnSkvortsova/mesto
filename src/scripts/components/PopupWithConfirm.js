import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor({popupElement, handleSubmitForm}) {
    super(popupElement);
    this.handleSubmitForm = handleSubmitForm;

    this._formElement = this.popupElement.querySelector('.popup__form');
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleSubmitForm();
    })
  }
}