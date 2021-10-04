import { h } from 'vue'
import { QInput, QField } from 'quasar'
import { optionsFn } from './utils'
import popup from './popup'
import icons from './icons'

export default function (props, renderCtx, vmCtx) {
  const { data, computed, methods } = vmCtx
  const inputCtx = Object.assign({ ref: 'input' }, vmCtx)
  const options = optionsFn(renderCtx, inputCtx)

  const isClearable = !!data.values.value.input && props.clearable && !props.disable && !props.readonly
  const component = computed.isReadonly.value ? QField : QInput

  const children = []
  if (computed.isReadonly.value && !props.disablePopup) {
    children.push(popup({ self, props, h }))
  }

  options.slots.append = function () {
    const components = []
    if (!props.format24h && computed.ampmSuffix.value && typeof props.displayValue !== 'string') {
      components.push(icons.suffix(props, renderCtx, vmCtx))
    }
    if (isClearable) {
      components.push(icons.clear(props, renderCtx, vmCtx))
    }
    if (!computed.isReadonly.value && !props.disablePopup) {
      components.push(icons.trigger(props, renderCtx, vmCtx))
    }
    return components
  }

  if (props.rules) {
    options.props.rules = props.rules.map(rule => {
      return (val) => {
        return rule(props.value)
      }
    })
  }

  if (!self.isReadonly) {
    options.props.clearable = false
    options.props.mask = computed.mask.value
    options.props.modelValue = data.values.value.input || ''
    options.props['onUpdate:modelValue'] = function (value) {
      data.values.value.input = value
      let oldValue = "" + data.values.value.input
      let isFilled = oldValue.length === computed.mask.value.length
      let isEmpty = oldValue.length === 0
      if (props.fillMask !== false) {
        const character = !props.fillMask || typeof props.fillMask !== "string" ? "_" : props.fillMask
        isFilled = oldValue.indexOf(character) === -1
        isEmpty = oldValue.replace(new RegExp(character, "gi"), "#") === computed.mask.value
      }

      if (isFilled || isEmpty) {
        methods.onInputFilled()
      }
    }
    options.props.onBlur = function (value) {
      methods.onInputBlur()
    }
    options.props.onKeyup = function (value) {
      switch (true) {
        case props.format24h: return
        case event.keyCode === 65 && data.values.value.suffix === 'PM':
        case event.keyCode === 80 && data.values.value.suffix === 'AM': methods.toggleSuffix(); break
        case event.shiftKey: return
        case event.keyCode === 38:
        case event.keyCode === 40: methods.toggleSuffix()
      }
    }
  } else {
    const text = typeof props.displayValue === 'string' ? props.displayValue : data.values.value.input
    options.props.stackLabel = !!text
    options.slots.control = function () {
      return h('span', {}, text || '')
    }
  }

  return h(component, options.props, options.slots)
}