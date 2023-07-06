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
          <h1 class="ma-2 pb-10">Verify email</h1>
        </v-card-title>
        <v-card-text class="text-medium-emphasis text-caption">
          We have sent you an verification link
        </v-card-text>
        <v-btn
          block
          type="submit"
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          @click="handleReSendVerification"
        >
          Resend Verification Code
        </v-btn>
      </v-card>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: false
  })

  const route = useRoute()

  const auth = useAuthStore();

  async function handleReSendVerification() {
    await auth.reSendVerificationLink()
  }

  // await auth.resetPassword();

</script>