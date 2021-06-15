export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;

    this._makeElements();
    this._setEventListeners();
  }

  _makeElements() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element');
    this._cardElement = cardTemplate.cloneNode(true);

    this._deleteButton = this._cardElement.querySelector('.element__trash');
    this._likeButton = this._cardElement.querySelector('.element__heart');
    this._imageCard = this._cardElement.querySelector('.element__image');
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._handleRemoveCard());
    this._likeButton.addEventListener('click', () => this._handleLikeCard());
    this._imageCard.addEventListener('click', () => this.handleCardClick(this._data));
  }

  _handleRemoveCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle('element__heart_active');
  }

  generateCard() {

    this._imageCard.src = this._data.link;
    this._imageCard.alt = this._data.name;
    this._cardElement.querySelector('.element__text').textContent = this._data.name;

    return this._cardElement;
  }
}
