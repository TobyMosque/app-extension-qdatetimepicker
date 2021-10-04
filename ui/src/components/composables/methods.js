import { h, nextTick, createApp, getCurrentInstance } from 'vue'
import { Quasar, QDate, QTime, QInput, QDialog, QMenu } from 'quasar'
import loadLang from '../../utils/lang'
import date from '../../utils/date'

function getBaseComponentMethods () {
  const root = document.createElement('div')
  const builder = createApp({
    setup () {
      return () => {
        return h('div', [
          h(QDate, { ref: 'date', modelValue: '' }),
          h(QTime, { ref: 'time', modelValue: '' }),
          h(QInput, { ref: 'input', modelValue: '' }),
          h(QDialog, { ref: 'dialog', modelValue: false }),
          h(QMenu, { ref: 'menu', modelValue: false })
        ])
      }
    }
  })
  const ClonedQuasarPlugin = Object.assign({}, Quasar, { __qInstalled: false })
  builder.use(ClonedQuasarPlugin, { config: {} })
  const _app = builder.mount(root)
  return Object.keys(_app.$refs).map((key) => {
    const component = _app.$refs[key]
    const allKeys = Object.keys(component)
    const propKeys = Object.keys(component.$props)
    const otherKeys = allKeys.filter(key => !propKeys.includes(key))
    const methodsKeys = otherKeys.filter(key => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const cur = component[key]
      return typeof cur === 'function'
    })
    return {
      key,
      methods: methodsKeys.map((key) => {
        return { name: key, uname: key }
      })
    }
  })
}
const baseComponentMethods = getBaseComponentMethods()

function checkUniqueMethodNames () {
  const mapper = new Map()
  mapper.set('onInputFilled', 1)
  mapper.set('onInputBlur', 1)
  mapper.set('onSetClick', 1)
  mapper.set('onPopupShow', 1)
  mapper.set('onPopupHide', 1)
  mapper.set('toggleSuffix', 1)
  for (const { methods } of baseComponentMethods) {
    for (const { name } of methods) {
      const qtd = mapper.get(name) || 0
      mapper.set(name, qtd + 1)
    }
  }
  for (const baseComponentMethod of baseComponentMethods) {
    const { key, methods } = baseComponentMethod
    for (const method of methods) {
      const qtd = mapper.get(method.name)
      if (qtd > 1) {
        method.uname = `${key}${method.name.substr(0, 1).toUpperCase()}${method.name.substr(1)}`
      }
    }
  }
}
checkUniqueMethodNames()

export default function useMethods({ props, emit, computed, data, refs }) {
  const vm = getCurrentInstance().proxy
  function __sleep () {
    return new Promise(resolve => setTimeout(resolve, delay))
  }

  function __configLanguage () {
    let isoName = Quasar.lang.isoName || computed.__properties.value.lang || navigator.language
    let lang
    try {
      lang = loadLang(isoName)
    } catch (e) {
      lang = loadLang("en-us")
    }
    data.isoLang.value = lang
  }

  function __updateDates (parsed) {
    let parts = parsed.quasar.split(' ')
    data.values.value.quasar = parsed.quasar
    data.values.value.iso = parsed.iso
    data.values.value.date = data.original.value.date = parts[0]
    data.values.value.time = data.original.value.time = parts[1]

    let formatted = date.masked({
      values: data.values.value,
      metas: data.metas.value,
      masks: data.masks.value
    })
    let masked = props.format24h ? formatted.format24 : formatted.format12
    if (data.values.value.suffix !== formatted.ampm || data.values.value.original !== masked) {
      nextTick().then(() => {
        data.values.value.suffix = formatted.ampm
        data.values.value.input = data.values.value.original = masked
      })
    }
    let current = data.standard.value === 'quasar' ? data.values.value.quasar : data.values.value.iso
    emit('update:modelValue', current)
  }

  function __updateValue (force = false) {
    if (props.value) {
      let current = data.standard.value === 'quasar' ? data.values.value.quasar : data.values.value.iso
      if (force || current !== props.value) {
        let proporsal = props.value
        if (data.standard.value === 'iso')
          proporsal = proporsal.replace(/-/g, '/').replace('T', ' ')
        let parts = proporsal.split(' ')
        if (parts.length === 1) {
          let today = date.getDefault({ mode: computed.__properties.value.mode })
          switch (computed.__properties.value.mode) {
            case 'date': proporsal = proporsal + ' 00:00:00'; break
            case 'time': proporsal = today.quasar + ' ' + proporsal; break
          }
        }
        let parsed = date.parse({ proporsal, withSeconds: computed.__properties.value.withSeconds })
        if (parsed.success) {
          __updateDates(parsed)
        }
      }
    } else {
      data.values.value.input = data.original.value.input = ''
      data.values.value.date = data.original.value.date = ''
      data.values.value.time = data.original.value.time = ''
    }
  }

  function onInputFilled () {
    let { input: value } = data.values.value
    if (!value) {
      emit('update:modelValue', '')
    } else {
      let proporsal = date.quasar({ 
        base: props.value,
        masked: value,
        ampm: computed.__properties.value.format24h ? void 0 : data.values.value.suffix,
        mode: props.mode,
        metas: data.metas.value,
        masks: data.masks.value
      })
      let parsed = date.parse({ proporsal, withSeconds: computed.__properties.value.withSeconds })
      if (parsed.success) {
        __updateDates(parsed)
      } else {
        let { input: original } = data.original.value
        nextTick().then(() => {
          data.values.value.input = original
        })
      }
    }
  }

  function onInputBlur () {
    data.masked.value = data.original.value.input
  }

  function onSetClick () {
    
    let today = date.getDefault({ mode: computed.__properties.value.mode })
    const mode = computed.__properties.value.mode
    switch (true) {
      case mode === 'date':
        data.original.value.date = data.values.value.date
        vm.$refs.popup.hide()
        break
      case mode === 'time':
        data.original.value.time = data.values.value.time
        vm.$refs.popup.hide()
        break
      case mode === 'datetime' && data.tab.value === 'date':
        data.original.value.date = data.values.value.date
        data.tab.value = 'time'
        break
      case mode === 'datetime' && data.tab.value === 'time':
        data.original.value.date = data.values.value.date
        data.original.value.time = data.values.value.time
        vm.$refs.popup.hide()
        break
    }
    let dateValue = data.original.value.date // || today.quasar
    let timeValue = data.original.value.time // || (this.withSeconds ? '00:00:00' : '00:00')
    if (!dateValue && timeValue) {
      dateValue = today.quasar
    }
    if (!timeValue && dateValue) {
      timeValue =  (computed.__properties.value.withSeconds.value ? '00:00:00' : '00:00')
    }
    if (dateValue && timeValue) {
      let proporsal = `${dateValue} ${timeValue}`
      let parsed = date.parse({ proporsal, withSeconds: computed.__properties.value.withSeconds })
      if (parsed.success) {
        __updateDates(parsed)
      }
    }
  }

  function onPopupShow () {
    data.tab.value = 'date'
  }

  function onPopupHide () {
    data.values.value.date = data.original.value.date
    data.values.value.time = data.original.value.time
  }

  function toggleSuffix () {
    data.values.value.suffix = data.values.value.suffix === 'PM' ? 'AM' : 'PM'
    if (data.values.value.input.length === computed.mask.value.length) {
      onInputFilled()
    }
  }

  const baseMethods = {}
  for (const { key, methods } of baseComponentMethods) {
    for (const { name, uname } of methods) {
      baseMethods[uname] = function (...args) {
        let root = refs[key]
        if (root != undefined) {
          return root[name].apply(root, args)
        }
      }
    }
  }

  return Object.assign({
    __sleep,
    __configLanguage,
    __updateDates,
    __updateValue,
    onInputFilled,
    onInputBlur,
    onSetClick,
    onPopupShow,
    onPopupHide,
    toggleSuffix
  }, baseMethods)
}