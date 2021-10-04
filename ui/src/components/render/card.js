import { h, getCurrentInstance } from 'vue'
import { Quasar, QCard, QCardActions, QBtn } from 'quasar'
import { optionsFn } from './utils'
import picker from './picker'
import tabs from './tabs'

export function content (props, renderCtx, vmCtx) {
  switch (props.mode) {
    case 'date': return picker.date(props, renderCtx, vmCtx)
    case 'time': return picker.time(props, renderCtx, vmCtx)
    default: return tabs(props, renderCtx, vmCtx)
  }
}

export default function render (props, renderCtx, vmCtx) {
  const { refs, methods } = vmCtx
  const vm = getCurrentInstance().proxy

  let children = [ content(props, renderCtx, vmCtx) ]
  if (!props.autoUpdateValue) {
    children.push(h(QCardActions, {
      align: 'right',
      dark: props.dark
    }, [
      h(QBtn, {
        dark: props.dark,
        flat: true,
        color: 'default',
        onClick () {
          vm.$refs.popup.hide()
        }
      }, {
        default (_) {
          return Quasar.lang.props.label.cancel || 'Cancel'
        }
      }),
      h(QBtn, {
        dark: props.dark,
        flat: true,
        color: props.color || 'primary',
        onClick () {
          methods.onSetClick()
        }
      }, {
        default (_) {
          return Quasar.lang.props.label.set || 'Set'
        }
      })
    ]))
  }

  const cardCtx = Object.assign({ ref: 'card' }, vmCtx)
  const options = optionsFn(renderCtx, cardCtx)
  options.props.class = {
    'q-datetimepicker': true,
    'q-datetimepicker-full-width': props.target === 'self' || !!props.displayValue,
    'q-datetimepicker-landscape': props.landscape,
    'q-datetimepicker-portrait': !props.landscape
  }
  options.slots.default = function (_) {
    return children
  }

  return h(QCard, options.props, options.slots)
}