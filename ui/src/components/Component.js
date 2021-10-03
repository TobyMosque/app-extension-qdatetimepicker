import { h } from 'vue'
import { QBadge } from 'quasar'

export default {
  name: 'QDateTimePicker',

  setup () {
    return () => h(QBadge, {
      class: 'QDateTimePicker',
      label: 'QDateTimePicker'
    })
  }
}
