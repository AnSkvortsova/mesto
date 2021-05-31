class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  // функция для установки слушателя на инпуты и кнопку
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', () => {
       this._checkInputValidity(inputElement);
       this.toggleButtonState();
     });
    });
  }

  // функция для проверки инпута на валидность
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  // функция для скрыть, показать ошибку 
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorActiveClass);
  }
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorActiveClass);
  }
  
  // функция для проверки всех инпутов формы на валидность
  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }
  
  // функция переключения состояний кнопки
  toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    }
  }

  // функция отчистки формы
  clearErrorElements() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    })
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator