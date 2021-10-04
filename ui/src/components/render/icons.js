import { h } from 'vue'
import Quasar, { QIcon } from 'quasar'
import popup from './popup'

export function suffix (props, renderCtx, vmCtx) {
  const { methods, computed } = vmCtx
  return h('h6', {
    class: `text-${props.color || 'primary'} cursor-pointer q-pr-xs`,
    onClick () {
      if (!props.disable && !props.readonly) {
        methods.toggleSuffix()
      }
    }
  }, {
    default (_) {
      return computed.ampmSuffix.value
    }
  })
}

export function clear (props, renderCtx, vmCtx) {
  const { methods, data } = vmCtx
  return h(QIcon, {
    staticClass: 'cursor-pointer',
    name: props.clearIcon || Quasar.iconSet.field.clear,
    onClick (e) {
      e.stopPropagation()
      data.values.value.input = ''
      methods.onInputFilled()
    }
  })
}

export function trigger (props, renderCtx, vmCtx) {
  let icon = props.mode === 'time' ? props.timeIcon : props.dateIcon;
  let _children = !props.disablePopup ? [popup(props, renderCtx, vmCtx)] : []
  return h(QIcon, {
    staticClass: 'cursor-pointer',
    name: icon || props.icon
  }, {
    default (_) {
      return _children
    }
  })
}

const icons = { suffix, clear, trigger }
export default icons
