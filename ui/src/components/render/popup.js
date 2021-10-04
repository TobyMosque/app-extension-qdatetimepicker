import { h } from 'vue'
import { QPopupProxy } from 'quasar'
import { optionsFn } from './utils'
import card from './card'

export default function render (props, renderCtx, vmCtx) {
  const {  methods } = vmCtx
  const cardCtx = Object.assign({ ref: 'popup' }, vmCtx)
  const options = optionsFn(renderCtx, cardCtx)

  delete options.props.target
  options.props.onBeforeShow = methods.onPopupShow
  options.props.onBeforeHide = methods.onPopupHide
  if (props.target === 'self' || !!props.displayValue) {
    options.props.fit = true
    options.props.cover = true
    options.props.anchor = props.anchor === void 0 ? 'top left' : props.anchor
  } else {
    options.props.fit = false
    options.props.cover = true
  }
  options.slots.default = function (_) {
    return [card(props, renderCtx, vmCtx)]
  }

  return h(QPopupProxy, options.props, options.slots)
}