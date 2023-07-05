<template>
  <form @submit.prevent="handleLogin">
    <label>
      Email
      <input type="email" v-model="form.email">
    </label>
    <label>
      Password
      <input type="password" v-model="form.password">
    </label>

    <button>Login</button>
  </form>
</template>

<style scoped></style>

<script lang="ts" setup>
definePageMeta({
  middleware: [
    'auth'
  ]
})

const form = ref({
  email: "test@example.com",
  password: "password"
})

const auth = useAuthStore();

async function handleLogin() {
  await auth.login(form.value);
  navigateTo('/')
}
</script>
