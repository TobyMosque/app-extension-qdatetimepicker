import Vue from 'vue'
import { QDate, QTime, QInput, QDialog, QMenu } from 'quasar'
import { getType } from '../../utils'

const { value: timeValue, options: timeOptions, mask: timeMask, ...timeProps } = QTime.options.props
const { value: dateValue, options: dateOptions, mask: dateMask, ...dateProps } = QDate.options.props
const { value: inputValue, mask: maskInput, ...inputProps } = QInput.options.props
const { value: dialogValue, ...dialogProps } = QDialog.options.props
const { value: menuValue, ...menuProps } = QMenu.options.props

const defaultProps = {
  ...dateProps,
  dateOptions,
  dateMask,
  ...timeProps,
  timeOptions,
  timeMask,
  ...inputProps,
  ...dialogProps,
  ...menuProps,
  lang: String,
  mode: {
    type: String,
    default: 'date',
    validation (value) {
      return ['date', 'time', 'datetime'].indexOf(value) !== -1
    }
  },
  calendar: {
    type: String,
    default: 'gregorian',
    validation (value) {
      return ['gregorian', 'persian'].indexOf(value) !== -1
    }
  },
  target: {
    type: String,
    default: 'icon',
    validation (value) {
      return ['self', 'icon'].indexOf(value) !== -1
    }
  },
  icon: {
    type: String,
    default: undefined
  },
  dateIcon: {
    type: String,
    default: 'event'
  },
  timeIcon: {
    type: String,
    default: 'access_time'
  },
  defaultStandard: {
    type: String,
    default: 'iso',
    validation (value) {
      return ['iso', 'quasar'].indexOf(value) !== -1
    }
  },
  disablePopup: {
    type: Boolean,
    default: false
  },
  displayValue: {
    type: [ Boolean, String ],
    default: false
  },
  clearIcon: String,
  autoUpdateValue: Boolean,
  hideTabs: {
    type: Boolean,
    default: false
  }
}
const keys = Object.keys(defaultProps);

let defaults = {}
const defaultOpts = {}
const properties = keys.reduce((props, key) => {
  const property = defaultProps[key]
  if (!property.type) {
    defaultOpts[key] = undefined
    props[key] = { type: property }
  } else if (property.default !== undefined) {
    const { default: $default, ...$property } = property
    defaultOpts[key] = getType($default) === 'function' ? $default() : $default;
    props[key] = $property
  } else {
    defaultOpts[key] = undefined
    props[key] = property
  }
  if (props[key].validator) {
    const validator = props[key].validator
    props[key].validator = function (val) {
      return validator(val === undefined ? defaults[key] : val)
    }
  }
  return props
}, {})

defaults = Vue.observable(defaultOpts);
properties.value = String 

export { keys, defaults }
export default properties