import { QInput, QField } from 'quasar'
import { options as optionsFn } from './_factory'
import popup from './popup'
import icons from './icons'

export default function render ({ self, props, h }) {
  const options = optionsFn({ self, ref: 'input' })

  const isClearable = !!self.values.input && props.clearable && !props.disable && !props.readonly
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
    options.props.value = self.values.input || ''
    options.on.input = function (value) {
      self.values.input = value
      let oldValue = "" + self.values.input
      let isFilled = oldValue.length === self.mask.length
      let isEmpty = oldValue.length === 0
      if (props.fillMask !== false) {
        const character = !props.fillMask || typeof props.fillMask !== "string" ? "_" : props.fillMask
        isFilled = oldValue.indexOf(character) === -1
        isEmpty = oldValue.replace(new RegExp(character, "gi"), "#") === self.mask
      }

      if (isFilled || isEmpty) {
        self.onInputFilled()
      }
    }
    options.on.blur = function (value) {
      self.onInputBlur()
    }
    options.on.keyup = function (value) {
      switch (true) {
        case props.format24h: return
        case event.keyCode === 65 && self.values.suffix === 'PM':
        case event.keyCode === 80 && self.values.suffix === 'AM': self.toggleSuffix(); break
        case event.shiftKey: return
        case event.keyCode === 38:
        case event.keyCode === 40: self.toggleSuffix()
      }
    }
  } else {
    const text = typeof props.displayValue === 'string' ? props.displayValue : self.values.input
    options.props.stackLabel = !!text
    options.scopedSlots.control = function () {
      return h('span', {}, text || '')
    }
  }

  return h(component, options, children)
}