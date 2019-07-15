// import 'q-datetimepicker-styl'
import QDatetimePicker from 'quasar-app-extension-qdatetimepicker/src/component/QDatetimePicker.js'

export default ({ Vue, ssrContext }) => {
  Vue.component('q-datetime-picker', QDatetimePicker({ ssrContext }))
}
