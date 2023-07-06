<template>
  <div>
    <v-app id="inspire">
      <v-app-bar
        class="px-3"
        color="white"
        flat
        density="compact"
      >
        <v-avatar
          color="grey-darken-1"
          size="32"
        ></v-avatar>

        <v-spacer></v-spacer>

        <v-tabs
          centered
          color="grey-darken-2"
        >
          <v-tab
            v-for="link in links"
            :key="link"
          >
            {{ link }}
          </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
        <ClientOnly>
          <div v-if="!auth.isLoggedIn">
            <v-btn color="success" to="/signin">Sign In</v-btn>
            <v-btn color="primary" to="/register">Register</v-btn>
          </div>
          <div v-else-if="auth && auth.user">
            Hello {{ auth.user.name }}
            <v-btn color="danger" v-if="auth.isLoggedIn" @click="handleLogout">Sign out</v-btn>
          </div>
        </ClientOnly>
      </v-app-bar>

      <v-main class="bg-grey-lighten-3">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="2"
            >
              <v-sheet
                rounded="lg"
                min-height="268"
              >
                <!--  -->
              </v-sheet>
            </v-col>

            <v-col
              cols="12"
              sm="8"
            >
              <v-sheet
                min-height="70vh"
                rounded="lg"
              >
                <!--  -->
              </v-sheet>
            </v-col>

            <v-col
              cols="12"
              sm="2"
            >
              <v-sheet
                rounded="lg"
                min-height="268"
              >
                <!--  -->
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script setup lang="ts">
  const auth = useAuthStore();

  async function handleLogout() {
    await auth.logout();
  }

  const links = [
    'Dashboard',
    'Messages',
    'Profile',
    'Updates',
  ]
</script>

<style scoped></style>