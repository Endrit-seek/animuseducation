export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore();

  if(process.client && auth.isLoggedIn) {
    if (auth.$state.user && auth.$state.user.email_verified_at === null ){
      return abortNavigation('You are not verified!')
    }
  }
})