import { defineStore } from 'pinia';
import jwtDecode from 'jwt-decode';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setUser(token) {
      this.token = token;
      const decodedToken = jwtDecode(token);
      this.user = {
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
        // add other fields as needed
      };
    },
    clearUser() {
      this.user = null;
      this.token = null;
    },
  },
});
