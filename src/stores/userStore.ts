import { makeAutoObservable } from "mobx";

class UserStore {
  email: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUserFromLocalStorage();
  }

  loadUserFromLocalStorage() {
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.email = email;
    }
  }

  setUserEmail(email: string) {
    this.email = email;
    localStorage.setItem('userEmail', email);
  }

  clearUserEmail() {
    this.email = null;
    localStorage.removeItem('userEmail');
  }
}

export const userStore = new UserStore();
