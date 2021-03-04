import { Quasar } from 'quasar'
const { lang: Lang } = Quasar

export default function createAppVault ({ cookies, i18n }) {
  const appModule = {
    i18n,
    data () {
      return {
        dark: null,
        locale: null
      }
    }
  }
  if (process.env.CLIENT) {
    Object.assign(appModule, {
      watch: {
        '$q.dark.isActive': {
          handler () {
            this.saveDark(this.$q.dark.isActive)
          }
        },
        '$q.dark.isoName': {
          handler () {
            this.saveLocale(this.$q.dark.isoName)
          }
        }
      },
      methods: {
        saveDark (value) {
          this.dark = value
          cookies.set('app-dark', this.dark, { path: '/' })
        },
        saveLocale (value) {
          this.locale = value
          cookies.set('app-locale', this.locale, { path: '/' })
        }
      }
    })
  } else {
    Object.assign(appModule, {
      methods: {
        loadDark () {
          if (cookies.has('app-dark')) {
            const dark = cookies.get('app-dark', { path: '/' })
            this.dark = dark
          }
        },
        loadLocale () {
          if (cookies.has('app-locale')) {
            const locale = cookies.get('app-locale', { path: '/' })
            this.locale = locale
          }
        }
      }
    })
  }

  Object.assign(appModule.methods, {
    updateDark () {
      if (this.dark !== null) {
        this.$q.dark.set(this.dark)
      }
    },
    async presetLocale ({ ssrContext } = {}) {
      if (this.locale !== null) {
        if (this.locale !== Lang.isoName) {
          let language = await import('quasar/lang/' + this.locale)
          language = language.default || language
          this.localeCtx = { ssrContext, language }
        }
      }
    },
    updateLocale () {
      if (this.locale !== null) {
        if (this.localeCtx) {
          const { ssrContext, language } = this.localeCtx
          this.$q.lang.set(language, ssrContext)
        }
        this.$i18n.locale = this.locale
      }
    }
  })
  return appModule
}
