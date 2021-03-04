import VuePlugin, { defaults } from '@toby.mosque/quasar-ui-qdatetimepicker'

export default function ({ Vue, store }) {
  if (store) {
    store.$qdtp = { defaults }
  }
  Vue.use(VuePlugin)
}

