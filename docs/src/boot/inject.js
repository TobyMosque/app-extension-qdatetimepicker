import Vue from 'vue'

const mixins = []
export default function inject (bootCb) {
  return async function (ctx) {
    const { app, router, store } = ctx
    let boot
    if (typeof bootCb === 'function') {
      const response = bootCb(ctx)
      boot = response.then ? await response : response
    } else {
      boot = bootCb
    }
    for (const name in boot) {
      const key = `$${name}`
      if (mixins.indexOf(name) === -1) {
        mixins.push(name)
        Vue.mixin({
          beforeCreate () {
            const options = this.$options
            if (options[name]) {
              this[key] = options[name]
            } else if (options.parent) {
              this[key] = options.parent[key]
            }
          }
        })
      }
      app[name] = boot[name]
      store[key] = boot[name]
      router[key] = boot[name]
    }
  }
}
