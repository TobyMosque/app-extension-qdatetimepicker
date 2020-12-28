import Vue from 'vue'
import * as meta from 'quasar-app-extension-qdatetimepicker/src/services/meta.js'
import * as date from 'quasar-app-extension-qdatetimepicker/src/services/date.js'
import Render from 'quasar-app-extension-qdatetimepicker/src/services/render.js'

import {
  dom,
  QField,
  QInput,
  QMenu,
  QDialog,
  QDate,
  QTime
} from 'quasar'

let { options: timeOptions, mask: timeMask, ...timeProps } = QTime.options.props
let { options: dateOptions, mask: dateMask, ...dateProps } = QDate.options.props
let { mask: maskInput, ...inputProps } = QInput.options.props

const { value, clearable, ...props } = {
  ...QDialog.options.props,
  ...QMenu.options.props,
  ...timeProps,
  ...dateProps,
  ...inputProps,
  timeOptions,
  dateOptions,
  timeMask,
  dateMask,
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
  defaultStandard: {
    type: String,
    default: 'iso',
    validation (value) {
      return ['iso', 'quasar'].indexOf(value) !== -1
    }
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
delete props.fit.default
delete props.cover.default
delete props.anchor.default
delete props.contentClass

export default function ({ ssrContext }) {
  return Vue.extend({
    name: 'QDatetimePicker',
    mixins: [ QField ],
    props: props,
    data () {
      return {
        tab: 'date',
        popup: false,
        standard: '',
        configured: false,
        original: {
          input: '',
          date: '',
          time: '',
        },
        values: {
          input: '',
          date: '',
          time: '',
          quasar: '',
          iso: '',
          suffix: 'AM'
        },
        metas: {
          date: {},
          time: {},
          ampm: {
            am: 'AM',
            pm: 'PM',
            suffix: true
          }
        },
        masks: {
          date: '##/##/####',
          time: '##:##'
        },
        isoLang: {
          lang: '',
          dateTimePicker: {}
        },
      }
    },
    computed: {
      language () {
        return (this.lang || this.$q.lang.isoName || navigator.language) + this.intlLocale
      },
      displayDate () {
        return ['date', 'datetime'].indexOf(this.mode) !== -1
      },
      displayTime () {
        return ['time', 'datetime'].indexOf(this.mode) !== -1
      },
      intlLocale () {
        var calendar = 'gregory'
        switch (this.calendar) {
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
          if (this.withSeconds) {
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
      }
    },
    watch: {
      defaultStandard: {
        immediate: true,
        handler () {
          if (!this.value) {
            this.standard = this.defaultStandard
          } else {
            let standard = this.defaultStandard
            switch (true) {
              case this.value.indexOf('-') !== -1: standard = 'iso'; break
              case this.value.indexOf('/') !== -1: standard = 'quasar'; break
            }
            this.standard = standard
          }
        }
      },
      language: {
        immediate: true,
        handler () {
          let date = { meta: {}, mask: '' }
          let time = { meta: {}, mask: '' }
          let ampm = { am: 'AM', am: 'PM', suffix: true }

          if (this.displayDate) {
            date = meta.date({ language: this.language, options: this.intlDateOptions })
          }
          if (this.displayTime) {
            time = meta.time({ language: this.language, options: this.intlTimeOptions })
          }
          if (!this.format24h) {
            ampm = meta.ampm({ language: this.language, options: this.intlTimeOptions })
          }

          this.$set(this.metas, 'date', date.meta)
          this.$set(this.masks, 'date', date.mask)
          this.$set(this.metas, 'time', time.meta)
          this.$set(this.masks, 'time', time.mask)
          this.$set(this.metas, 'ampm', ampm)
          this.__configLanguage()
          this.configured = true
          this.__updateValue(true)
        }
      },
      value: {
        immediate: true,
        handler () {
          if (this.configured) {
            this.__updateValue()
          }
        }
      }
    },
    methods: {
      __sleep (delay) {
        return new Promise(resolve => window.setTimeout(resolve, delay))
      },
      __configLanguage () {
        let isoName = this.$q.lang.isoName || this.lang || navigator.language
        let lang
        try {
          lang = require(`./lang/${isoName}`)
        } catch (e) {
          lang = require(`./lang/en-us`)
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
              let today = date.getDefault({ mode: this.mode })
              switch (this.mode) {
                case 'date': proporsal = proporsal + ' 00:00:00'; break
                case 'time': proporsal = today.quasar + ' ' + proporsal; break
              }
            }
            let parsed = date.parse({ proporsal, withSeconds: this.withSeconds })
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
            ampm: this.format24h ? void 0 : this.values.suffix,
            mode: this.mode,
            metas: this.metas,
            masks: this.masks
          })
          let parsed = date.parse({ proporsal, withSeconds: this.withSeconds })
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
        let today = date.getDefault({ mode: this.mode })
        let commitedChanges = true
        switch (true) {
          case this.mode === 'date':
            this.original.date = this.values.date
            this.$refs.popup.hide()
            break
          case this.mode === 'time':
            this.original.time = this.values.time
            this.$refs.popup.hide()
            break
          case this.mode === 'datetime' && this.tab === 'date':
            this.original.date = this.values.date
            this.tab = 'time'
            commitedChanges = false
            break
          case this.mode === 'datetime' && this.tab === 'time':
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
          timeValue =  (this.withSeconds ? '00:00:00' : '00:00')
        }
        if (dateValue && timeValue) {
          let proporsal = `${dateValue} ${timeValue}`
          let parsed = date.parse({ proporsal, withSeconds: this.withSeconds })
          if (parsed.success) {
            this.__updateDates(parsed)
          }
          if (commitedChanges) {
            this.$emit('commit', parsed)
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
    },
    render (h) {
      var self = this
      var render = new Render(self, h)
      return render.main()
    }
  })
}
