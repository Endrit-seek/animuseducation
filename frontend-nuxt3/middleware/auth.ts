export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore();

  if(process.client && auth.isLoggedIn) {
    return abortNavigation('Not Allowed')
  }
})