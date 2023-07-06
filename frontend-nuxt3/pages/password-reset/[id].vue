<template>
  <div>
    <v-row align="center" justify="center" style="height:100vh">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        width="448"
        max-width="448"
        rounded="lg"
      >
      
        <v-card-title primary-title class="d-flex align-center justify-center">
          <h1 class="ma-2 pb-10">Reset  password</h1>
        </v-card-title>

        <v-form validate-on="submit lazy" @submit.prevent="handleResetPassword">
          <v-text-field
            id="email"
            name="email"
            type="email"
            density="compact"
            disabled
            variant="outlined"
            :label="emailAddress"
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

          <v-text-field
            v-model="password_confirmation.value.value"
            :error-messages="password_confirmation.errorMessage.value"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            id="password_confirmation"
            name="password_confirmation"
            density="compact"
            variant="outlined"
            placeholder="Confirm your password"
            label="Retype Password"
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
            Reset your password
          </v-btn>
        </v-form>
      </v-card>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: [
      'auth'
    ],
    layout: false
  })

  const route = useRoute()
  const emailAddress = route.query.email as string;

  const errors = useErrorStore()
  const auth = useAuthStore();

  const visible = ref<boolean>(false);

  const { handleSubmit } = useForm({
    validationSchema: {
      password (value: string) {
        if (!!value && value.length >= 8) return true

        return 'Password must be 8 chars or more'
      },
      password_confirmation (value: string) {
      if (value === password.value.value && value) return true

      return 'Password should match'
    }
    }
  })

  const password = useField('password');
  const password_confirmation = useField('password_confirmation');


  const handleResetPassword = handleSubmit(async (values) => {
    if (values.password && values.password_confirmation) {
      await auth.resetPassword(
        emailAddress,
        values.password,
        values.password_confirmation,
        route.params.id as string
      );

      navigateTo('/signin')
    }
  })

</script>