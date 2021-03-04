import Vue from 'vue'

export default class Vault {
  constructor ({ state = {} } = {}) {
    this.state = state
  }

  registerState (namespace, { data }) {
    if (!this.state[namespace]) {
      const state = Vue.observable(typeof data === 'function' ? data() : data)
      this.state[namespace] = typeof state === 'function' ? state() : state
    }
  }

  registerModule (namespace, { data, mounted, ...props }) {
    this.registerState(namespace, { data })
    if (!this[namespace]) {
      const self = this
      const options = {
        name: `module-${namespace}`,
        data () {
          return self.state[namespace]
        },
        render: h => h('div'),
        ...props
      }
      this[namespace] = new Vue(options)
      this[namespace].$mount()
    }
  }

  unregisterModule (namespace) {
    if (!this.state[namespace]) {
      this[namespace].$destroy()
      delete this[namespace]
      delete this.state[namespace]
    }
  }

  replaceState (data) {
    if (process.env.CLIENT) {
      const keys = Object.keys(data)
      for (const key of keys) {
        this.registerState(key, { data: data[key] })
      }
    }
  }

  static install (Vue, options) {
    Vue.mixin({
      beforeCreate () {
        const options = this.$options
        if (options.store) {
          this.$store = options.store
        } else if (options.parent) {
          this.$store = options.parent.$store
        }
      }
    })
  }
}

export function defineComponent (namespace, { data, destroyed, preFetch, ...options }) {
  return {
    async preFetch (context) {
      const { store } = context
      const vault = store.$vault
      if (!vault.state[namespace]) {
        vault.registerModule(namespace, { data })
        context.vault = store.$vault
        context.data = store.$vault.state[namespace]
        context.axios = store.$axios
        if (preFetch) {
          await preFetch(context)
        }
      }
    },
    data () {
      return this.$vault.state[namespace]
    },
    destroyed () {
      delete this.$vault.unregisterModule(namespace)
      if (preFetch) {
        destroyed.bind(this)()
      }
    },
    ...options
  }
}
