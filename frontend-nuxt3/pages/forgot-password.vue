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
          <h1 class="ma-2 pb-10">Forgot password?</h1>
        </v-card-title>

        <v-form validate-on="submit lazy" @submit.prevent="handleForgotPassword">
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

          <v-btn
            block
            type="submit"
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
          >
            Send confirmation link
          </v-btn>
        </v-form>
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

  const { handleSubmit } = useForm({
    validationSchema: {
      email (value: string) {
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) return true

        return 'Must be a valid e-mail.'
      },
    }
  })

  const email = useField('email');

  const handleForgotPassword = handleSubmit(async (values) => {
    if (values.email) {
      await auth.forgotPassword(values.email);

      // if (!auth.isLoggedIn) {
      //   navigateTo('/login')
      // }
    }
  })
</script>
