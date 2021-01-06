// import 'q-datetimepicker-styl'
import { QDatetimePicker, icons } from 'quasar-app-extension-qdatetimepicker/src/component'

export default ({ Vue, app, store, ssrContext }) => {
  const options = { icons }
  app.qdtp = options
  if (store) {
    store.$qdtp = options
  }
  Vue.component('q-datetime-picker', QDatetimePicker({ ssrContext }))
  Vue.mixin({
    beforeCreate () {
      const options = this.$options
      if (options.qdtp) {
        this.$qdtp = options.qdtp
      } else if (options.parent) {
        this.$qdtp = options.parent.$qdtp
      }
    }
  })
}
