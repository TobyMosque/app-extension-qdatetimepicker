import Component from './components/Component'
import { defaults } from './components/composables/props'

const version = __UI_VERSION__
const QDTP_DEFAULTS = 'QDTP_DEFAULTS'

function install (app) {
  app.component(Component.name, Component)
  app.provide(QDTP_DEFAULTS, defaults)
}

export {
  version,
  Component,
  install,
  QDTP_DEFAULTS
}
