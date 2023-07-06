import { AsyncData } from "#app";

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

      const response = await useApiFetch("/api/login", {
        method: "POST",
        body: credentials,
      }) as AsyncData<Data, any>;

      if (!response.error.value) {
        if (process.client) {
          localStorage.setItem("token", 'Bearer ' + response.data.value.token)
        }
        await this.fetchUser();
      }

      return response;
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
    },

    async forgotPassword(email: string) {
      await useApiFetch("/sanctum/csrf-cookie");

      await useApiFetch("/api/forgot-password", {
        method: 'POST',
        body: {
          email: email
        }
      })
    },

    async resetPassword(email: string, password: string, password_confirmation: string, token: string) {
      await useApiFetch("/sanctum/csrf-cookie");

      await useApiFetch("/api/reset-password", {
        method: 'POST',
        body: {
          email: email,
          password: password,
          password_confirmation: password_confirmation,
          token: token,
        }
      })
    },

    async reSendVerificationLink() {
      await useApiFetch("/sanctum/csrf-cookie");

      await useApiFetch("/api/email/verification-notification", {
        method: 'POST',
      })

      await this.fetchUser();
    }
  },

  persist: {
    storage: persistedState.localStorage,
  },
})

type Data = {
  token: string
}

type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string,
  created_at: string,
  updated_at: string
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
