import { computed } from 'vue'
import { keys, defaults } from './props'
import { Dark, useQuasar } from 'quasar'

export default function useComputed({ props, data }) {
  const quasar = useQuasar()
  const __properties = computed(() => {
    const _props =  keys.reduce((_props, key) => {
      const $value = props[key]
      const $default = Dark.isActive ? defaults.dark[key] : defaults.light[key]
      _props[key] = $value === undefined ? $default : $value
      return _props
    }, {})
    return _props
  })

  const intlLocale = computed(() => {
    var calendar = 'gregory'
    switch (__properties.value.calendar) {
      case 'gregorian': calendar = 'gregory'; break
      case 'persian': calendar = 'persian'; break
    }
    return `-u-ca-${calendar}-nu-latn`
  })

  const locale = computed(() => {
    return (__properties.value.lang || quasar.lang.isoName || navigator.language) + intlLocale.value
  })


  const displayDate = computed(() => {
    return ['date', 'datetime'].indexOf(__properties.value.mode) !== -1
  })

  const displayTime = computed(() => {
    return ['time', 'datetime'].indexOf(__properties.value.mode) !== -1
  })

  const intlDateOptions = computed(() => {
    return displayDate.value ? { day: '2-digit', month: '2-digit', year: 'numeric' } : {}
  })

  const intlTimeOptions = computed(() => {
    let options = {}
    if (displayTime.value) {
      options = { hour: '2-digit', minute: '2-digit', hour12: !props.format24h }
      if (__properties.value.withSeconds) {
        options.second = '2-digit'
      }
    }
    return options
  })

  const intlOptions = computed(() => {
    return Object.assign({}, intlDateOptions.value, intlTimeOptions.value)
  })

  const ampmSuffix = computed(() => {
    switch (true) {
      case !data.values.value.time: return ''
      case data.values.value.suffix === 'AM': return data.metas.value.ampm.am
      case data.values.value.suffix === 'PM': return data.metas.value.ampm.pm
    }
  })

  const mask = computed(() => {
    if (data.masks.value.date && data.masks.value.time) {
      return `${data.masks.value.date} ${data.masks.value.time}`
    } else {
      return data.masks.value.date || data.masks.value.time
    }
  })

  const inputBreakpoints = computed(() => {
    if (data.masks.value.date && data.masks.value.time) {
      return `${data.masks.value.date} ${data.masks.value.time}`
    } else {
      return data.masks.value.date || data.masks.value.time
    }
  })

  const isReadonly = computed(() => {
    return __properties.value.disable || __properties.value.target === 'self' || !!__properties.value.displayValue
  })

  return {
    __properties,
    intlLocale,
    locale,
    displayDate,
    displayTime,
    intlDateOptions,
    intlTimeOptions,
    intlOptions,
    ampmSuffix,
    mask,
    inputBreakpoints,
    isReadonly
  }
}