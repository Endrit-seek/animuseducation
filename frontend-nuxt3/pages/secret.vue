<template>
  <div>
    Only for verified users
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: [
    'verified'
  ],
  layout: false
})
</script>