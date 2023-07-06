import type { UseFetchOptions } from 'nuxt/app'

export function useApiFetch<T> (path: string, options: UseFetchOptions<T> = {}) {
  let headers: any = {}
 
  const token = useCookie('XSRF-TOKEN');
 
  if (token.value) {
    headers['X-XSRF-TOKEN'] = token.value as string;
  }

  if (process.client && window.localStorage.getItem('token')) {
    headers['Autherization'] = window.localStorage.getItem('token') as string;
  }
 
  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["referer", "cookie"])
    }
  }
 
  return useFetch("http://localhost:8000" + path, {
    credentials: "include",
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers
    },
    onRequest() {
      useErrorStore().$reset();
    },
    onResponse({ response }) {
      const message = useMessageStore()
      if (response._data.status) {
        message.$state.text = response._data.status
      }
    },
    onResponseError({ response }) {
      const errors = useErrorStore()
      errors.$state.errors = response._data.errors;
      errors.$state.message = response._data.message;
      errors.$state.status = response.status;
      errors.$state.statusText = response.statusText;
      setTimeout(() => {
        errors.$reset()
      }, errors.$state.timeout)
    }
  });
}