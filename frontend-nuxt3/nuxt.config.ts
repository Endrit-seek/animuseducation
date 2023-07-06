// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: ['vuetify'],
  },
  devtools: { enabled: true },
  modules:
  [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    ['@vee-validate/nuxt', {
      // disable or enable auto imports
      autoImports: true,
      // Use different names for components
      componentNames: {
        Form: 'VeeForm',
        Field: 'VeeField',
        FieldArray: 'VeeFieldArray',
        ErrorMessage: 'VeeErrorMessage',
      },
    }]
  ],
  pinia:
  {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      // automatically imports `defineStore` as `definePiniaStore`
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ]
  },
  imports: {
    dirs: ['./stores'],
  },
})
