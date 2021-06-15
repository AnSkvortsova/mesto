export class Section {
  constructor({items, renderer}, elementsContainer) {
    this._items = items;
    this._renderer = renderer;
    this._elementsContainer = document.querySelector(elementsContainer);

    this.renderItems();
  }
  renderItems() {
    this._items.forEach(cardData => {
      this._elementsContainer.append(this._renderer(cardData));
    });
  };
  
  addItem(cardData) {
    this._elementsContainer.prepend(this._renderer(cardData));
  };
}