import { keys, defaults } from './props'

const computed = {}

computed.__properties = function () {
  return keys.reduce((props, key) => {
    const $value = this[key]
    const $default = defaults[key]
    props[key] = $value === undefined ? $default : $value
  }, {})
}

export default computed
