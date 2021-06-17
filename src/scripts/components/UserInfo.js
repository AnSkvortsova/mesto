export class UserInfo {
  constructor({titleElement, subtitleElement}) {
    this._titleElement = document.querySelector(titleElement);
    this._subtitleElement = document.querySelector(subtitleElement);
  }

  getUserInfo() {
    return {
      userName: this._titleElement.textContent,
      userJob: this._subtitleElement.textContent,
    }
  }
  setUserInfo(data) {
    this._titleElement.textContent = data.userName;
    this._subtitleElement.textContent = data.userJob;
  }
}