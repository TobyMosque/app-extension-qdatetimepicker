import { h, nextTick, createApp } from 'vue'
import { Quasar, QDate, QTime, QInput, QDialog, QMenu } from 'quasar'
import loadLang from '../../utils/lang'

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

export default function useMethods(props, emit, _computed, _data, _refs) {
  function __sleep () {
    return new Promise(resolve => setTimeout(resolve, delay))
  }

  function __configLanguage () {
    let isoName = Quasar.lang.isoName || _computed.__properties.value.lang.value || navigator.language
    let lang
    try {
      lang = loadLang(isoName)
    } catch (e) {
      lang = loadLang("en-us")
    }
    _data.isoLang.value = lang
  }

  function __updateDates (parsed) {
    let parts = parsed.quasar.split(' ')
    _data.values.value.quasar = parsed.quasar
    _data.values.value.iso = parsed.iso
    _data.values.value.date = _data.original.value.date = parts[0]
    _data.values.value.time = _data.original.value.time = parts[1]

    let formatted = date.masked({
      values: _data.values.value,
      metas: _data.metas.value,
      masks: _data.masks.value
    })
    let masked = props.format24h ? formatted.format24 : formatted.format12
    if (_data.values.value.suffix !== formatted.ampm || _data.values.value.original !== masked) {
      nextTick().then(() => {
        _data.values.value.suffix = formatted.ampm
        _data.values.value.input = _data.values.value.original = masked
      })
    }
    let current = _data.standard.value === 'quasar' ? _data.values.value.quasar : _data.values.value.iso
    emit('update:modelValue', current)
  }

  function __updateValue (force = false) {
    if (props.value) {
      let current = _data.standard.value === 'quasar' ? _data.values.value.quasar : _data.values.value.iso
      if (force || current !== props.value) {
        let proporsal = props.value
        if (_data.standard.value === 'iso')
          proporsal = proporsal.replace(/-/g, '/').replace('T', ' ')
        let parts = proporsal.split(' ')
        if (parts.length === 1) {
          let today = date.getDefault({ mode: _computed.__properties.value.mode.value })
          switch (_computed.__properties.value.mode.value) {
            case 'date': proporsal = proporsal + ' 00:00:00'; break
            case 'time': proporsal = today.quasar + ' ' + proporsal; break
          }
        }
        let parsed = date.parse({ proporsal, withSeconds: _computed.__properties.value.withSeconds.value })
        if (parsed.success) {
          __updateDates(parsed)
        }
      }
    } else {
      _data.values.value.input = _data.original.value.input = ''
      _data.values.value.date = _data.original.value.date = ''
      _data.values.value.time = _data.original.value.time = ''
    }
  }

  function onInputFilled () {
    let { input: value } = _data.values.value
    if (!value) {
      emit('update:modelValue', '')
    } else {
      let proporsal = date.quasar({ 
        base: props.value,
        masked: value,
        ampm: _computed.__properties.value.format24h.value ? void 0 : _data.values.value.suffix,
        mode: props.mode,
        metas: _data.metas.value,
        masks: _data.masks.value
      })
      let parsed = date.parse({ proporsal, withSeconds: _computed.__properties.value.withSeconds.value })
      if (parsed.success) {
        __updateDates(parsed)
      } else {
        let { input: original } = _data.original.value
        nextTick().then(() => {
          _data.values.value.input = original
        })
      }
    }
  }

  function onInputBlur () {
    _data.masked.value = _data.original.value.input
  }

  function onSetClick () {
    let today = date.getDefault({ mode: _computed.__properties.value.mode.value })
    const mode = _computed.__properties.value.mode.value
    switch (true) {
      case mode === 'date':
        _data.original.value.date = _data.values.value.date
        _refs.popup.value.hide()
        break
      case mode === 'time':
        _data.original.value.time = _data.values.value.time
        _refs.popup.value.hide()
        break
      case mode === 'datetime' && _data.tab.value === 'date':
        _data.original.value.date = _data.values.value.date
        _data.tab.value = 'time'
        break
      case mode === 'datetime' && _data.tab.value === 'time':
        _data.original.value.date = _data.values.value.date
        _data.original.value.time = _data.values.value.time
        _refs.popup.value.hide()
        break
    }
    let dateValue = _data.original.value.date // || today.quasar
    let timeValue = _data.original.value.time // || (this.withSeconds ? '00:00:00' : '00:00')
    if (!dateValue && timeValue) {
      dateValue = today.quasar
    }
    if (!timeValue && dateValue) {
      timeValue =  (_computed.__properties.value.withSeconds.value ? '00:00:00' : '00:00')
    }
    if (dateValue && timeValue) {
      let proporsal = `${dateValue} ${timeValue}`
      let parsed = date.parse({ proporsal, withSeconds: _computed.__properties.value.withSeconds.value })
      if (parsed.success) {
        __updateDates(parsed)
      }
    }
  }

  function onPopupShow () {
    _data.tab.value = 'date'
  }

  function onPopupHide () {
    _data.values.value.date = _data.original.value.date
    _data.values.value.time = _data.original.value.time
  }

  function toggleSuffix () {
    _data.values.value.suffix = _data.values.value.suffix === 'PM' ? 'AM' : 'PM'
    if (_data.values.input.value.length === _computed.mask.value.length) {
      onInputFilled()
    }
  }

  const baseMethods = {}
  for (const { key, methods } of baseComponentMethods) {
    for (const { name, uname } of methods) {
      baseMethods[uname] = function (...args) {
        let root = _refs[key]
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