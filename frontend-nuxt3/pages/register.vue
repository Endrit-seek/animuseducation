<template>
  <form @submit.prevent="handleRegister">
    <label>
      Name
      <input v-model="form.name" type="text">
    </label>
    <label>
      Email
      <input v-model="form.email" type="email">
    </label>
    <label>
      Password
      <input v-model="form.password" type="password">
    </label>
    <label>
      Password confirmation
      <input v-model="form.password_confirmation" type="password">
    </label>
 
    <button>Register</button>
  </form>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: [
    'auth'
  ]
})

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
});
 
const auth = useAuthStore();
 
async function handleRegister() {
  const { error } = await auth.register(form.value);

  if (!error.value) {
    await auth.login({
      email: form.value.email,
      password: form.value.password
    })

    navigateTo("/");
  } else {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
}
</script>