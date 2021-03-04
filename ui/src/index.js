import { version } from '../package.json'
import { defaults } from './components/options/props'
import Component from './components/Component'

export {
  version,
  defaults,
  Component
}

export default {
  version,
  defaults,
  Component,
  install (Vue) {
    Vue.component(Component.name, Component)
    this.$qdtp = { defaults }
  }
}
