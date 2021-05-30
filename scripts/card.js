class Card {
  constructor(data, templateSelector, onOpen) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._onOpen = onOpen;

    this._makeElements();
    this._setEventListeners();
  }

  _makeElements() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element');
    this._cardElement = cardTemplate.cloneNode(true);

    this._deleteButton = this._cardElement.querySelector('.element__trash');
    this._likeButton = this._cardElement.querySelector('.element__heart');
    this._imageCard = this._cardElement.querySelector('.element__image');

    this._newLinkPopup = document.querySelector('.popup__image-big');
    this._newPlacePopup = document.querySelector('.popup__text');
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._handleRemoveCard());
    this._likeButton.addEventListener('click', () => this._handleLikeCard());
    this._imageCard.addEventListener('click', () => this._handleOpenPopap());
  }

  _handleRemoveCard() {
    this._cardElement.remove();
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle('element__heart_active');
  }

  _handleOpenPopap() {
    this._newLinkPopup.src = this._data.link;
    this._newLinkPopup.alt = this._data.name;
    this._newPlacePopup.textContent = this._data.name;
    this._onOpen(document.querySelector('.popup_type_image'));
  }

  generateCard() {

    this._imageCard.src = this._data.link;
    this._imageCard.alt = this._data.name;
    this._cardElement.querySelector('.element__text').textContent = this._data.name;

    return this._cardElement;
  }
}

export default Card