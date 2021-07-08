export class Card {
  constructor({data, myUserId, templateSelector, handleCardClick, handleLikeCard, handleRemoveCard}) {
    this._data = data;
    this._myUserId = myUserId;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    this.handleLikeCard = handleLikeCard;
    this.handleRemoveCard = handleRemoveCard;

    this._makeElements();
    this._setEventListeners();
  }

  _makeElements() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element');
    this._cardElement = cardTemplate.cloneNode(true);

    this._deleteButton = this._cardElement.querySelector('.element__trash');
    this._likeButton = this._cardElement.querySelector('.element__heart');
    this._likeCounter = this._cardElement.querySelector('.element__number');
    this._imageCard = this._cardElement.querySelector('.element__image');

    this._likes = this._data.likes;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this.handleRemoveCard());
    this._likeButton.addEventListener('click', () => this.handleLikeCard());
    this._imageCard.addEventListener('click', () => this.handleCardClick(this._data));
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  isLike() {
    return this._likes.find((item) => item._id === this._myUserId);
  }

  countLikes() {
    this._likeCounter.textContent = this._likes.length;
    if(this.isLike()) {
      this._likeButton.classList.add('element__heart_active');
    } else {
      this._likeButton.classList.remove('element__heart_active');
    }
  }

  setLikes(data) {
    this._likes = data.likes;
    this.countLikes();
  }

  generateCard() {
    this._imageCard.src = this._data.link;
    this._imageCard.alt = this._data.name;
    this._cardElement.querySelector('.element__text').textContent = this._data.name;

    this.countLikes();

    if (this._data.owner._id !== this._myUserId) {
      this._deleteButton.remove();
    }

    return this._cardElement;
  }
}
