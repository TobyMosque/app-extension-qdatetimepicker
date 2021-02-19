import { options as optionsFn } from './_factory'
import { QDate, QTime } from 'quasar'

export function date ({ self, props, h }) {
  const options = optionsFn({ self, ref: 'date' })
  options.props.options = props.dateOptions
  options.props.mask = props.dateMask
  options.props.value = props.values.date
  options.on.input = function (value) {
    props.values.date = value
    if (props.autoUpdateValue) {
      self.onSetClick()
    }
  }
  return h(QDate, options)
}

export function time ({ self, props, h }) {
  const options = optionsFn({ self, ref: 'date' })
  options.props.options = props.timeOptions
  options.props.mask = props.timeMask
  options.props.value = props.values.time
  options.on.input = function (value) {
    props.values.time = value
    if (props.autoUpdateValue) {
      self.onSetClick()
    }
  }
  return h(QTime, options)
}

export default { date, time }