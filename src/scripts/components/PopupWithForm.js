import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({popupElement, handleSubmitForm}) {
    super(popupElement);
    this.handleSubmitForm = handleSubmitForm;

    this._makeElements();
  };

  _makeElements() {
    this._formElement = this.popupElement.querySelector('.popup__form');
    this._inputs = Array.from(this._formElement.querySelectorAll('.popup__input'));
    this._button = this.popupElement.querySelector('.popup__submit');
  };

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  };

  setInitialValues(data) {
    Object.keys(data).forEach(initialDataKey => {
      const input = this._inputs.find(i => i.name === initialDataKey);
      input.value = data[initialDataKey];
    });
  };

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleSubmitForm(this._getInputValues());
    })
  };

  closePopup() {
    super.close();
    this._formElement.reset();
  };
};
