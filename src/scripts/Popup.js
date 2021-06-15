export class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);

    this._bindElements();
  }

  _bindElements(){
    this._heandleKey = this._heandleKey.bind(this);
    this._heandleOverlay = this._heandleOverlay.bind(this);
  }

  openPopup() {
    this.popupElement.classList.add('popup_opend');
  }

  closePopup() {
    this.popupElement.classList.remove('popup_opend');
  }

  _heandleKey(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }
  
  _heandleOverlay(evt) {
    if(evt.target.classList.contains('popup_opend')) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this.popupElement.querySelector('.popup__close').addEventListener('click', () => {
      this.closePopup();
    });
    document.addEventListener('keydown', this._heandleKey);
    document.addEventListener('click', this._heandleOverlay);
  }
}