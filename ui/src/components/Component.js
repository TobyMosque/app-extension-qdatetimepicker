import { h, getCurrentInstance } from 'vue'
import { QBadge } from 'quasar'
import props from './composables/props'
import useData from './composables/data'
import useRefs from './composables/refs'
import useComputed from './composables/computed'
import useMethods from './composables/methods'

export default {
  name: 'QDateTimePicker',
  props,
  setup (props, { emit, expose }) {
    const _data = useData()
    const _refs = useRefs()
    const _computed = useComputed(props, _data)
    const _methods = useMethods(props, emit, _computed, _data, _refs)
    expose(Object.assign({}, _data, _computed, _refs, _methods))
    
    return () => {
      return h(QBadge, {
        class: 'QDateTimePicker',
        label: 'QDateTimePicker'
      })
    }
  }
}
