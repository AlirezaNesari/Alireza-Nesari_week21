const TOKEN_KEY = "token";

const listeners = new Set();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export const tokenStorage = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getServerSnapshot() {
    return undefined;
  },

  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
    notifyListeners();
  },

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    notifyListeners();
  },

  subscribe(listener) {
    listeners.add(listener);
    window.addEventListener("storage", listener);

    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", listener);
    };
  },
};