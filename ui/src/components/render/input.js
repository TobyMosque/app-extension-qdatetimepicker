import { QInput, QField } from 'quasar'
import { options as optionsFn } from './_factory'
import popup from './popup'
import icons from './icons'

export default function render ({ self, props, h }) {
  const options = optionsFn({ self, ref: 'input' })

  const isClearable = !!props.values.input && props.clearable && !props.disable && !props.readonly
  const component = self.isReadonly ? QField : QInput
  const children = []
  if (self.isReadonly && !props.disablePopup) {
    children.push(popup({ self, props, h }))
  }

  options.scopedSlots.append = function () {
    const components = []
    if (!props.format24h && self.ampmSuffix && typeof props.displayValue !== 'string') {
      components.push(icons.suffix({ self, props, h }))
    }
    if (isClearable) {
      components.push(icons.clear({ self, props, h }))
    }
    if (!self.isReadonly && !props.disablePopup) {
      components.push(icons.trigger({ self, props, h }))
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
    options.props.mask = self.mask
    options.props.value = props.values.input || ''
    options.on.input = function (value) {
      props.values.input = value
      if (props.values.input.length === self.mask.length || props.values.input.length === 0) {
        self.onInputFilled()
      }
    }
    options.on.blur = function (value) {
      self.onInputBlur()
    }
    options.on.keyup = function (value) {
      switch (true) {
        case props.format24h: return
        case event.keyCode === 65 && props.values.suffix === 'PM':
        case event.keyCode === 80 && props.values.suffix === 'AM': self.toggleSuffix(); break
        case event.shiftKey: return
        case event.keyCode === 38:
        case event.keyCode === 40: self.toggleSuffix()
      }
    }
  } else {
    const text = typeof props.displayValue === 'string' ? props.displayValue : props.values.input
    options.props.stackLabel = !!text
    options.scopedSlots.control = function () {
      return h('span', {}, text || '')
    }
  }

  return h(component, options, children)
}