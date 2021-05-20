// функция отчистки формы
function clearErrorElements(formList) {
  const {inputSelector} = config;
  formList.forEach(formElement => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach(inputElement => {
      hideInputError(formElement, inputElement, config);
    })
  })
}

// функция для скрыть, показать ошибку 
const hideInputError = (formElement, inputElement, config) => {
  const {inputErrorClass, errorActiveClass} = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorActiveClass);
}
const showInputError = (formElement, inputElement, config) => {
  const {inputErrorClass, errorActiveClass} = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorActiveClass);
}

// функция для проверки инпута на валидность
const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}

// функция для проверки всех инпутов формы на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

// функция переключения состояний кнопки
const toggleButtonState = (buttonElement, inputList) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

// функция для установки слушателя на инпуты и кнопку
const setEventListeners = (formElement, config) => {
  const {inputSelector, submitButtonSelector, ...restConfig} = config;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, restConfig);
      toggleButtonState(buttonElement, inputList);
    });
  })
  toggleButtonState(buttonElement, inputList);
}

// функция, которая проверяет все формы на валидность
const enableValidation = (config) => {
  const {formSelector, ...restConfig} = config;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, restConfig);
  })
}