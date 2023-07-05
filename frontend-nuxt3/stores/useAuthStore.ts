export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  actions: {
    async fetchUser() {
      if (process.client && localStorage.getItem('token')) {
          const { data }: any = await useApiFetch("/api/user", {
            method: "GET"
          });
          
          this.user = data.value.user as User;
        }
    },

    async login(credentials: Credentials) {
      await useApiFetch("/sanctum/csrf-cookie");

      const login: any = await useApiFetch("/api/login", {
        method: "POST",
        body: credentials,
      });

      if (process.client) {
        localStorage.setItem("token", 'Bearer ' + login.data.value.token)
      }
      await this.fetchUser();

      return login;
    },

    async register(info: RegistrationInfo) {
      await useApiFetch("/sanctum/csrf-cookie");

      const register = await useApiFetch("/api/register", {
        method: "POST",
        body: info,
      });

      return register;
    },

    async logout() {
      await useApiFetch("/api/logout", {method: "POST"});
  
      this.user = null;
  
      if (process.client) {
        window.localStorage.removeItem('token');
      }
    }
  },

  persist: {
    storage: persistedState.localStorage,
  },
})

type User = {
  id: number;
  name: string;
  email: string;
}

type Credentials = {
  email: string;
  password: string;
}

type RegistrationInfo = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
