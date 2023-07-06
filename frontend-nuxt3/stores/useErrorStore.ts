export const useErrorStore = defineStore('error', {
  state: () => ({
    errors: {} as Errors,
    message: '',
    status: null || 0,
    statusText: null || '',
    timeout: 10000,
  }),
})

type Errors = {
  [field: string]: Array<string>
}