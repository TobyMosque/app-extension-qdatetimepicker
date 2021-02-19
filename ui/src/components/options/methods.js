import { QDate, QTime, QInput, QDialog, QMenu } from 'quasar'
import date from '../../utils/date'

const methods = {
  __sleep (delay) {
    return new Promise(resolve => window.setTimeout(resolve, delay))
  },
  __configLanguage () {
    let isoName = this.$q.lang.isoName || this.__properties.lang || navigator.language
    let lang
    try {
      lang = require(`../../lang/${isoName}`)
    } catch (e) {
      lang = require(`../../lang/en-us`)
    }
    this.$set(this, 'isoLang', lang.default)
  },
  __updateDates (parsed) {
    let parts = parsed.quasar.split(' ')
    this.values.quasar = parsed.quasar
    this.values.iso = parsed.iso
    this.values.date = this.original.date = parts[0]
    this.values.time = this.original.time = parts[1]

    let formatted = date.masked({ values: this.values, metas: this.metas, masks: this.masks })
    let masked = this.format24h ? formatted.format24 : formatted.format12
    if (this.values.suffix !== formatted.ampm || this.values.original !== masked) {
      this.$nextTick().then(() => {
        this.values.suffix = formatted.ampm
        this.values.input = this.values.original = masked
      })
    }
    let current = this.standard === 'quasar' ? this.values.quasar : this.values.iso
    this.$emit('input', current)
  },
  __updateValue (force = false) {
    if (this.value) {
      let current = this.standard === 'quasar' ? this.values.quasar : this.values.iso
      if (force || current !== this.value) {
        let proporsal = this.value
        if (this.standard === 'iso')
          proporsal = proporsal.replace(/-/g, '/').replace('T', ' ')
        let parts = proporsal.split(' ')
        if (parts.length === 1) {
          let today = date.getDefault({ mode: this.__properties.mode })
          switch (this.__properties.mode) {
            case 'date': proporsal = proporsal + ' 00:00:00'; break
            case 'time': proporsal = today.quasar + ' ' + proporsal; break
          }
        }
        let parsed = date.parse({ proporsal, withSeconds: this.__properties.withSeconds })
        if (parsed.success) {
          this.__updateDates(parsed)
        }
      }
    } else {
      this.values.input = this.original.input = ''
      this.values.date = this.original.date = ''
      this.values.time = this.original.time = ''
    }
  },
  onInputFilled () {
    let { input: value } = this.values
    if (!value) {
      this.$emit('input', '')
    } else {
      let proporsal = date.quasar({ 
        base: this.value,
        masked: value,
        ampm: this.__properties.format24h ? void 0 : this.values.suffix,
        mode: this.mode,
        metas: this.metas,
        masks: this.masks
      })
      let parsed = date.parse({ proporsal, withSeconds: this.__properties.withSeconds })
      if (parsed.success) {
        this.__updateDates(parsed)
      } else {
        let { input: original } = this.original
        this.$nextTick().then(() => {
          this.values.input = original
        })
      }
    }
  },
  onInputBlur () {
    this.masked = this.original.input
  },
  onSetClick () {
    let today = date.getDefault({ mode: this.__properties.mode })
    switch (true) {
      case this.__properties.mode === 'date':
        this.original.date = this.values.date
        this.$refs.popup.hide()
        break
      case this.__properties.mode === 'time':
        this.original.time = this.values.time
        this.$refs.popup.hide()
        break
      case this.__properties.mode === 'datetime' && this.tab === 'date':
        this.original.date = this.values.date
        this.tab = 'time'
        break
      case this.__properties.mode === 'datetime' && this.tab === 'time':
        this.original.date = this.values.date
        this.original.time = this.values.time
        this.$refs.popup.hide()
        break
    }
    let dateValue = this.original.date // || today.quasar
    let timeValue = this.original.time // || (this.withSeconds ? '00:00:00' : '00:00')
    if (!dateValue && timeValue) {
      dateValue = today.quasar
    }
    if (!timeValue && dateValue) {
      timeValue =  (this.__properties.withSeconds ? '00:00:00' : '00:00')
    }
    if (dateValue && timeValue) {
      let proporsal = `${dateValue} ${timeValue}`
      let parsed = date.parse({ proporsal, withSeconds: this.__properties.withSeconds })
      if (parsed.success) {
        this.__updateDates(parsed)
      }
    }
  },
  onPopupShow () {
    this.tab = 'date'
  },
  onPopupHide () {
    this.values.date = this.original.date
    this.values.time = this.original.time
  },
  toggleSuffix () {
    this.values.suffix = this.values.suffix === 'PM' ? 'AM' : 'PM'
    if (this.values.input.length === this.mask.length) {
      this.onInputFilled()
    }
  }
}
const count = new Map()
const components = [
  { name: 'date', component: QDate },
  { name: 'time', component: QTime },
  { name: 'input', component: QInput },
  { name: 'dialog', component: QDialog },
  { name: 'menu', component: QMenu }
]
for (const item of components) {
  const keys = Object.keys(item.component.options.methods || {})
  for (const key of keys) {
    const qtd = count.get(key) || ( methods[key] ? 1 : 0)
    count.set(key, qtd + 1)
  }
}
for (const item of components) {
  const keys = Object.keys(item.component.options.methods || {})
  for (const key of keys) {
    const qtd = count.get(key)
    const name = qtd > 1 ? `${item.name}${key.substr(0, 1).toUpperCase()}${key.substr(1)}` : key
    methods[name] = function (...args) {
      let root = this.$refs[item.name]
      if (root != undefined) {
        return root[key].apply(root, args)
      }
    }
  }
}

export default methods