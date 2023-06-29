<script lang="ts" setup>
const form = ref({
  email: "test@example.com",
  password: "password"
})

const auth = useAuthStore();

async function handleLogin() {
  const { error } = await auth.login(form.value);
  console.log(error);
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
