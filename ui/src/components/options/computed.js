import { keys, defaults } from './props'

const computed = {
  language () {
    return (this.__properties.lang || this.$q.lang.isoName || navigator.language) + this.intlLocale
  },
  displayDate () {
    return ['date', 'datetime'].indexOf(this.__properties.mode) !== -1
  },
  displayTime () {
    return ['time', 'datetime'].indexOf(this.__properties.mode) !== -1
  },
  intlLocale () {
    var calendar = 'gregory'
    switch (this.__properties.calendar) {
      case 'gregorian': calendar = 'gregory'; break
      case 'persian': calendar = 'persian'; break
    }
    return `-u-ca-${calendar}-nu-latn`
  },
  intlDateOptions () {
    return this.displayDate ? { day: '2-digit', month: '2-digit', year: 'numeric' } : {}
  },
  intlTimeOptions () {
    let options = {}
    if (this.displayTime) {
      options = { hour: '2-digit', minute: '2-digit', hour12: !this.format24h }
      if (this.__properties.withSeconds) {
        options.second = '2-digit'
      }
    }
    return options
  },
  intlOptions () {
    return { ...this.intlDateOptions, ...this.intlTimeOptions }
  },
  ampmSuffix () {
    switch (true) {
      case !this.values.time: return ''
      case this.values.suffix === 'AM': return this.metas.ampm.am
      case this.values.suffix === 'PM': return this.metas.ampm.pm
    }
  },
  mask () {
    if (this.masks.date && this.masks.time) {
      return `${this.masks.date} ${this.masks.time}`
    } else {
      return this.masks.date || this.masks.time
    }
  },
  inputBreakpoints () {
    if (this.masks.date && this.masks.time) {
      return `${this.masks.date} ${this.masks.time}`
    } else {
      return this.masks.date || this.masks.time
    }
  },
  isReadonly () {
    return this.__properties.disable || this.__properties.target === 'self' || !!this.__properties.displayValue
  },
  __properties () {
    const props =  keys.reduce((props, key) => {
      const $value = this[key]
      const $default = this.$q.dark.isActive ? defaults.dark[key] : defaults.light[key]
      props[key] = $value === undefined ? $default : $value
      return props
    }, {})
    return props
  }
}

export default computed
