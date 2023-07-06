export const useMessageStore = defineStore('message', {
  state: () => ({
    text: '',
    timeout: 5000,
  })
})
