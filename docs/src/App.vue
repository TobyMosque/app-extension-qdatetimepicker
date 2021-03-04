<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { detectLocale } from 'src/services/locale'
import Vue from 'vue'

const page = {
  name: 'App'
}
if (process.env.SERVER) {
  Object.assign(page, {
    async preFetch ({ store, ssrContext }) {
      const vault = store.$vault
      vault.app.$q = Vue.prototype.$q
      vault.app.loadDark()
      vault.app.loadLocale()
      await vault.app.presetLocale({ ssrContext })
    },
    created () {
      this.$vault.app.$q = this.$q
      this.$vault.app.updateLocale()
      this.$vault.app.updateDark()
    }
  })
}
if (process.env.CLIENT) {
  Object.assign(page, {
    mounted () {
      if (this.$vault.app.dark === null) {
        const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
        this.$vault.app.saveDark(dark)
      }
      if (this.$vault.app.locale === null) {
        const locale = detectLocale()
        this.$vault.app.saveLocale(locale)
      }
      this.$vault.app.updateDark()
      this.$vault.app.updateLocale()
    }
  })
}
export default page
</script>
