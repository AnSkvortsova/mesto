export class UserInfo {
  constructor({titleElement, subtitleElement, avatarElement}) {
    this._titleElement = document.querySelector(titleElement);
    this._subtitleElement = document.querySelector(subtitleElement);
    this._avatarElement = document.querySelector(avatarElement);
  }

  getUserData() {
    return {
      userName: this._titleElement.textContent,
      userJob: this._subtitleElement.textContent,
    }
  }
  
  setUserInfo(data) {
    this._titleElement.textContent = data.name;
    this._subtitleElement.textContent = data.about;
  }
  setAvatar(data) {
    this._avatarElement.src = data.avatar;
  }
}