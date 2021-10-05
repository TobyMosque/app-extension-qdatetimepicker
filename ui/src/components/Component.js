import props from './composables/props'
import useData from './composables/data'
import useRefs from './composables/refs'
import useComputed from './composables/computed'
import useMethods from './composables/methods'
import useWatch from './composables/watch'
import input from './render/input'

export default {
  name: 'QDateTimePicker',
  props,
  setup (props, ctx) {
    const { attrs, emit, expose } = ctx
    const refs = useRefs()
    const data = useData()
    const computed = useComputed({ props, data })
    const methods = useMethods({ props, attrs, emit, refs, data, computed })
    const vmCtx = { refs, data, computed, methods }
    const watch = useWatch({ props, attrs, data, computed, methods })
    expose(Object.assign({}, refs, data, computed, methods))
    
    return () => {
      const _props = Object.assign({ modelValue: attrs.modelValue }, computed.__properties.value)
      return [input(_props, ctx, vmCtx)]
    }
  }
}
