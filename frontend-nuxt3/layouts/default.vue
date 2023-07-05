<script lang="ts" setup>
  const auth = useAuthStore();

  async function handleLogout() {
    await auth.logout();

    navigateTo("/login");
  }
</script>

<template>
  <div>
    <ClientOnly>
      <button  type="button" name="logout" v-if="auth.isLoggedIn" @click="handleLogout">Logout</button>
      <ul>
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li v-if="!auth.isLoggedIn">
          <NuxtLink  to="/register">Register</NuxtLink>
        </li>
        <li v-if="!auth.isLoggedIn">
          <NuxtLink  to="/login">Login</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/auth-only">Auth only</NuxtLink>
        </li>
        <li>
          <NuxtLink  to="/guest-only">Guest only</NuxtLink>
        </li>
      </ul>
      <slot />
    </ClientOnly>
  </div>
</template>

<style scoped></style>