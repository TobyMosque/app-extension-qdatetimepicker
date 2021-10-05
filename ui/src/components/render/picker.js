import { h } from 'vue'
import { QDate, QTime } from 'quasar'
import { optionsFn } from './utils'


export function date (props, renderCtx, vmCtx) {
  const { data, methods } = vmCtx
  const dateCtx = Object.assign({ ref: 'date' }, vmCtx)
  const options = optionsFn(renderCtx, dateCtx)

  options.props.options = props.dateOptions
  options.props.mask = props.dateMask
  options.props.modelValue = data.values.value.date
  console.log(options.props.modelValue)
  options.props['onUpdate:modelValue'] = function (value) {
    data.values.value.date = value
    if (props.autoUpdateValue) {
      methods.onSetClick()
    }
  }
  return h(QDate, options.props, options.slots)
}

export function time (props, renderCtx, vmCtx) {
  const { data, methods } = vmCtx
  const timeCtx = Object.assign({ ref: 'time' }, vmCtx)
  const options = optionsFn(renderCtx, timeCtx)

  options.props.options = props.timeOptions
  options.props.mask = props.timeMask
  options.props.modelValue = data.values.value.time
  options.props['onUpdate:modelValue'] = function (value) {
    data.values.value.time = value
    if (props.autoUpdateValue) {
      methods.onSetClick()
    }
  }
  return h(QTime, options.props, options.slots)
}

export default { date, time }