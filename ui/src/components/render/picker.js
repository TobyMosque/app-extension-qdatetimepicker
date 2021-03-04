import { options as optionsFn } from './_factory'
import { QDate, QTime } from 'quasar'

export function date ({ self, props, h }) {
  const options = optionsFn({ self, ref: 'date' })
  options.props.options = props.dateOptions
  options.props.mask = props.dateMask
  options.props.value = self.values.date
  options.on.input = function (value) {
    self.values.date = value
    if (props.autoUpdateValue) {
      self.onSetClick()
    }
  }
  return h(QDate, options)
}

export function time ({ self, props, h }) {
  const options = optionsFn({ self, ref: 'time' })
  options.props.options = props.timeOptions
  options.props.mask = props.timeMask
  options.props.value = self.values.time
  options.on.input = function (value) {
    self.values.time = value
    if (props.autoUpdateValue) {
      self.onSetClick()
    }
  }
  return h(QTime, options)
}

export default { date, time }