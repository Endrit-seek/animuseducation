<template>
  <div>
    <v-row align="center" justify="center" style="height:100vh">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        width="460"
        max-width="700"
        rounded="lg"
      >
        <v-card-title primary-title class="d-flex align-center justify-center">
          <h1 class="ma-2 pb-10">Register</h1>
        </v-card-title>

        <v-form validate-on="submit lazy" @submit.prevent="handleRegister">
          <v-text-field
            v-model="name.value.value"
            :error-messages="name.errorMessage.value || errors.$state.errors.name"
            id="name"
            name="name"
            type="name"
            density="compact"
            placeholder="ex: Endrit Krasniqi"
            variant="outlined"
            label="Full Name"
          >
            <template v-slot:prepend-inner>
              <v-icon size="xs-small" icon="mdi-account" />
            </template>
          </v-text-field>
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
            :disabled="isDisabled"
          >
            Create Account
          </v-btn>
        </v-form>

        <p class="text-body-2 mt-10">
          <span
            >Already have an account?
            <NuxtLink to="/signin" class="font-weight-bold text-primary">Sign In</NuxtLink></span
          >
        </p>
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

const visible = ref<boolean>(false);
const errors = useErrorStore();

const { handleSubmit } = useForm({
  validationSchema: {
    name (value: string) {
      if (value?.length >= 2) return true

      return 'Name needs to be at least 2 characters.'
    },
    email (value: string) {
      if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) return true

      return 'Must be a valid e-mail.'
    },
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

const isDirty = useIsFormDirty();
const isValid = useIsFormValid();

const isDisabled = computed(() => {
  return !isDirty.value || !isValid.value;
});

const name = useField('name');
const email = useField('email');
const password = useField('password');
const password_confirmation = useField('password_confirmation');
 
const auth = useAuthStore();

const handleRegister = handleSubmit(async (values) => {
  const { error } = await auth.register({
    name: values.name,
    email: values.email,
    password: values.password,
    password_confirmation: values.password_confirmation,
  });

  if (!error.value) {
    await auth.login({
      email: values.email,
      password: values.password
    })

    navigateTo("/");
  } else {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
})
</script>