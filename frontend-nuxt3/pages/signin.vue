<template>
  <div>
    <v-row align="center" justify="center" style="height:100vh">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
      
        <v-card-title primary-title class="d-flex align-center justify-center">
          <h1 class="ma-2 pb-10">Sign In</h1>
        </v-card-title>

        <v-form validate-on="submit lazy" @submit.prevent="handleLogin">
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value || errors.$state.errors.email"
            id="email"
            name="email"
            type="email"
            density="compact"
            placeholder="ex: john@gmail.com"
            variant="outlined"
            label="Email address"
          >
            <template v-slot:prepend-inner>
              <v-icon size="xs-small" icon="mdi-email" />
            </template>
          </v-text-field>
          
          <v-text-field
            v-model="password.value.value"
            :error-messages="password.errorMessage.value || errors.$state.errors.password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            id="password"
            name="password"
            density="compact"
            variant="outlined"
            placeholder="Insert your password"
            label="Password"
            @click:append-inner="visible = !visible"
          >
            <template v-slot:prepend-inner>
              <v-icon size="xs-small" icon="mdi-lock-outline" />
            </template>
          </v-text-field>

          <v-btn
            block
            type="submit"
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
          >
            Sign In
          </v-btn>
        </v-form>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          <NuxtLink to="/forgot-password">
            Forgot login password?
          </NuxtLink>
        </div>

        <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
        >
          <v-card-text class="text-medium-emphasis text-caption">
            Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
          </v-card-text>
        </v-card>

        <v-card-text class="text-center">
          <v-btn
            class="text-blue text-decoration-none"
            rel="noopener noreferrer"
            variant="plain"
            to="/register"
          >
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
      
    </v-row>
  </div>
</template>

<style scoped>
</style>

<script lang="ts" setup>
  definePageMeta({
    middleware: [
      'auth'
    ],
    layout: false
  })

  const errors = useErrorStore()
  const auth = useAuthStore();

  const visible = ref<boolean>(false);

  const { handleSubmit } = useForm({
    validationSchema: {
      email (value: string) {
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) return true

        return 'Must be a valid e-mail.'
      },
      password (value: string) {
        if (!!value && value.length >= 8) return true

        return 'Password must be 8 chars or more'
      }
    }
  })

  const email = useField('email');
  const password = useField('password');

  const handleLogin = handleSubmit(async (values) => {
    if (values.email && values.password) {
      await auth.login({
        email: values.email,
        password: values.password
      });

      if (auth.isLoggedIn) {
        navigateTo('/')
      }
    }
  })
</script>
