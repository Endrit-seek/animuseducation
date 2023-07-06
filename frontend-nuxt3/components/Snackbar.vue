<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      :timeout="errors.$state.timeout"
      class="pa-0 ma-0"
    >
      <v-alert
        type="success"
        title="Alert title"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
      ></v-alert>
      <!-- <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template> -->
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
  const errors = useErrorStore()
  const snackbar = ref<boolean>(false)

  watch(
    () => errors.$state.message,
    (newVal) => {
      if (newVal) {
        snackbar.value = true;
      }
    }
  )
</script>