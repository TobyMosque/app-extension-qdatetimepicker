import { QPopupProxy } from 'quasar'
import { options as optionsFn } from './_factory'
import card from './card'

export default function render ({ self, props, h }) {
  const options = optionsFn({ self, ref: 'popup' })

  delete options.props.target
  options.on['before-show'] = self.onPopupShow
  options.on['before-hide'] = self.onPopupHide
  if (props.target === 'self' || !!props.displayValue) {
    options.attrs.fit = true
    options.attrs.cover = true
    options.attrs.anchor = props.anchor === void 0 ? 'top left' : props.anchor
  } else {
    options.attrs.fit = false
    options.attrs.cover = true
  }

  return h(QPopupProxy, options, [card({ self, props, h })])
}