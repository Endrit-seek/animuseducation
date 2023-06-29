<script lang="ts" setup>
const form = ref({
  email: "test@example.com",
  password: "password"
})

async function handleLogin() {
  await useApiFetch("/sanctum/csrf-cookie")

  await useApiFetch("/login", {
    method: "POST",
    body: form.value
  })

  const { data } = await useApiFetch("/api/user")

  console.log(data);
  
}
</script>

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
