export class Section {
  constructor({renderer}, elementsContainer) {
    this._renderer = renderer;
    this._elementsContainer = document.querySelector(elementsContainer);
  }
  
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  };
  
  addItem(element) {
    this._elementsContainer.append(element);
  };

  addNewItem(element) {
    this._elementsContainer.prepend(element);
  }
}