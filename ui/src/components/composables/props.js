import { QDate, QTime, QInput, QDialog, QMenu } from 'quasar'
import { getType } from '../../utils'
import { Dark } from 'quasar'
import { reactive, toRefs } from 'vue'

const { value: timeValue, options: timeOptions, mask: timeMask, ...timeProps } = QDate.props
const { value: dateValue, options: dateOptions, mask: dateMask, ...dateProps } = QTime.props
const { value: inputValue, mask: maskInput, ...inputProps } = QInput.props
const { value: dialogValue, ...dialogProps } = QDialog.props
const { value: menuValue, ...menuProps } = QMenu.props

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

const keys = Object.keys(defaultProps)
let defaults = {
  light: {},
  dark: {}
}

const defaultOpts = {}
const properties = keys.reduce((props, key) => {
  const property = defaultProps[key]
  const type = property.type || property
  const types = type && Array.isArray(type) ? type : [type]
  const _default = types.indexOf(Boolean) !== -1 ? false : undefined;
  if (!property.type) {
    defaultOpts[key] = _default
    props[key] = { type: property }
  } else if (property.default !== undefined) {
    const { default: $default, ...$property } = property
    defaultOpts[key] = getType($default) === 'function' ? $default() : $default;
    props[key] = $property
  } else {
    defaultOpts[key] = _default
    props[key] = Object.assign({}, property)
  }
  props[key].default = types.indexOf(Function) !== -1 ? undefined : function () {
    return undefined
  }
  if (props[key].validator) {
    const validator = props[key].validator
    props[key].validator = function (val) {
      const _defaults = Dark.isActive ? defaults.dark : defaults.light;
      return validator(val === undefined ? _defaults[key] : val)
    }
  }
  return props
}, {})

const defaultsLight = reactive(Object.assign({}, defaultOpts));
const defaultsDark = reactive(Object.assign({}, defaultOpts));
defaults.light = toRefs(defaultsLight);
defaults.dark = toRefs(defaultsDark);
properties.value = String 

export { keys, defaults }
export default properties
