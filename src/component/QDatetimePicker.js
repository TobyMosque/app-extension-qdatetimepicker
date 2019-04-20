import Vue from 'vue'

import {
  dom,
  QField,
  QInput,
  QIcon,
  QBtn,
  QPopupProxy,
  QCard,
  QCardSection,
  QCardActions,
  QTabs,
  QTab,
  QTabPanels,
  QTabPanel,
  QDate,
  QTime
} from 'quasar'

const fields = Object.keys(QField.options.props)
  .filter(field => [ 'value' ].indexOf(field) === -1)

const renderDate = function (self, h) {
  return [
    h(QDate, {
      props: {
        dark: self.dark,
        color: self.color,
        value: self.values.date,
        landscape: self.landscape,
        todayBtn: self.todayBtn,
        calendar: self.calendar,
        options: self.dateOptions
      },
      on: {
        input (value) { self.values.date = value }
      }
    }, [])
  ]
}

const renderTime = function (self, h) {
  return [
    h(QTime, {
      props: {
        dark: self.dark,
        color: self.color,
        value: self.values.time,
        landscape: self.landscape,
        format24h: self.format24h,
        options: self.timeOptions
      },
      on: {
        input (value) { self.values.time = value }
      }
    }, [])
  ]
}

const renderTabsTitle = function (self, h) {
  return h(QTabs, {
    class: `bg-${self.color || 'primary'} text-white`,
    props: {
      value: self.tab,
      vertical: self.landscape,
      dense: true
    },
    on: {
      input (value) {
        self.tab = value
      }
    }
  }, [
    h(QTab, {
      props: {
        name: 'date',
        icon: 'event',
        label: self.isoLang.dateTimePicker.date
      }
    }, []),
    h(QTab, {
      props: {
        name: 'time',
        icon: 'access_time',
        label: self.isoLang.dateTimePicker.time
      }
    }, [])
  ])
}

const renderTabPabels = function (self, h) {
  return h(QTabPanels, {
    props: {
      value: self.tab
    },
    on: {
      input (value) {
        self.tab = value
      }
    }
  }, [
    h(QTabPanel, {
      props: {
        name: 'date'
      }
    }, renderDate(self, h)),
    h(QTabPanel, {
      props: {
        name: 'time'
      }
    }, renderTime(self, h))
  ])
}

const renderVerticalDateTime = function (self, h) {
  return [
    h('div', {
      class: { 'row': true }
    }, [
      h('div', {
        class: { 'col-auto': true },
        style: { 'min-width': '75px' }
      }, [
        renderTabsTitle(self, h)
      ]),
      h('div', {
        class: { 'col': true },
      }, [
        renderTabPabels(self, h)
      ])
    ])
  ]
}

const renderDateTime = function (self, h) {
  return [
    renderTabsTitle(self, h),
    renderTabPabels(self, h)
  ]
}

const renderInput = function (self, h, inputFields, scopedSlots, children) {
  return h(QInput, { 
    ref: 'input',
    props: {
      ...inputFields,
      mask: self.mask,
      value: self.masked
    },
    on: {
      input (value) {
        self.masked = value
      },
      blur () {
        let value = '' + (self.value || '')
        self.__onValueUpdated(value)
      }
    },
    scopedSlots: scopedSlots
  }, children || [])
}

const renderReadonlyInput = function (self, h, inputFields, scopedSlots, children) {
  children = children || []
  children.unshift(h('input', { 
    class: {
      'q-field__native': true
    },
    attrs: {
      readonly: true,
      value: self.display
    }
  }, []))
  return h(QField, { 
    ref: 'input',
    props: {
      ...inputFields,
      stackLabel: true
    },
    scopedSlots: scopedSlots
  }, children)
}

const renderPopupProxy = function (self, h) {
  let renderContent = (() => {
    switch (self.mode) {
      case 'date': return renderDate
      case 'time': return renderTime
      case 'datetime': return self.landscape ? renderVerticalDateTime : renderDateTime
    }
  })()

  return [
    h(QPopupProxy, {
      ref: 'popup',
      attrs: {
        fit: self.fit,
        cover: self.cover,
        anchor: self.anchor || (self.target === 'self' ? 'top left' : undefined)
      },
      props: {
        breakpoint: 600
      },
      on: {
        'before-show': self.__onOpen,
        'before-hide': self.__onClose,
        name: 'event'
      }
    }, [
      h(QCard, {
        ref: 'card',
        class: { 
          'q-datetimepicker': true, 
          'q-datetimepicker-full-width': self.target === 'self',
          'q-datetimepicker-landscape': self.landscape,
          'q-datetimepicker-portrait': !self.landscape
        },
        props: {
          dark: self.dark
        },
        on: {
          'before-show': self.__onOpen,
          name: 'event'
        }
      }, [
        h(QCardSection, {}, renderContent(self, h)),
        h(QCardActions, {
          props: {
            align: 'right',
            dark: self.dark
          }
        }, [
          h(QBtn, {
            props: {
              dark: self.dark,
              flat: true,
              color: 'default'
            },
            on: {
              click () { self.$refs.popup.hide() }
            },
            scopedSlots: {
              default (props) {
                return self.$q.lang.label.cancel || 'Cancel'
              }
            }
          }, [])
          ,h(QBtn, {
            props: {
              dark: self.dark,
              flat: true,
              color: self.color || 'primary'
            },
            on: {
              click: self.__onSetClick
            },
            scopedSlots: {
              default (props) {
                return self.$q.lang.label.set || 'Set'
              }
            }
          }, [])
        ])
      ])
    ])
  ]
}

const toISOString = function (date) {
  if (!date || !date.getTimezoneOffset) {
    return null
  }

  let offset = date.getTimezoneOffset() * -1
  if (offset % 30 === 0)
  {
    date = new Date(date.getTime() + offset * 60000)
    date = date.toISOString().replace('Z', '')
  }
  else 
  {
    date = new Date(date.getTime() + offset * 60000)
    date = date.toISOString().replace('Z', '').substring(0, 16)
  }

  return date
}

export default Vue.extend({
  name: 'QDatetimePicker',
  mixins: [ QField ],
  props: {
    value: String,
    lang: String,
    mode: {
      type: String,
      default: "date",
      validation (value) {
        return ["date", "time", "datetime"].indexOf(value) !== -1
      }
    },
    defaultStandard: {
      type: String,
      default: "iso",
      validation (value) {
        return ["iso", "quasar"].indexOf(value) !== -1
      }
    },
    format24h: {
      type: Boolean,
      default: false
    },
    displayValue: {
      type: [ Boolean, String ],
      default: false
    },
    icon: String,
    landscape: Boolean,
    todayBtn: Boolean,
    dateOptions: [Array, Function],
    timeOptions: Function,
    cover: {
      type: Boolean,
      default: true
    },
    calendar: {
      type: String,
      default: "gregorian",
      validation (value) {
        return ["gregorian", "persian"].indexOf(value) !== -1
      }
    },
    fit: Boolean,
    anchor: String,
    target: {
      type: String,
      default: "icon",
      validation (value) {
        return ["self", "icon"].indexOf(value) !== -1
      }
    }
  },
  created () {
    this.__updateMetadata()
    this.__setupLanguage()
    
    if (!process.env.SERVER) {
      let self = this
      self._onResizeEvent = () => self.__updatePosition()
      window.addEventListener('resize', self._onResizeEvent)
      window.addEventListener('scroll', self._onResizeEvent)
    }
  },
  destroyed () {
    if (!process.env.SERVER) {
      window.removeEventListener('resize', self._onResizeEvent)
      window.removeEventListener('resize', self._onResizeEvent)
    }
  },
  data () {
    return {
      tab: 'date',
      masked: '',
      display: '',
      popup: false,
      inputs: {
        date: '',
        time: ''
      },
      values: {
        iso: '',
        date: '',
        time: '00:00:00'
      },
      masks: {
        date: '##/##/####',
        time: '##:##'
      },
      metas: {
        date: {},
        time: {}
      },
      isoLang: {
        lang: '',
        dateTimePicker: {}
      },
      track: {
        format: '',
        hasSeparator: true,
      }
    }
  },
  watch: {
    language() {
      this.__updateMetadata()
      this.__setupLanguage()
      this.__onChange()
    },
    intlOptions () {
      this.__updateMetadata()
      this.__onChange()
    },
    masked () {
      this.__onInput()
    },
    value: {
      immediate: true,
      handler (value) {
        this.__onValueUpdated(value)
      }
    },
  },
  computed: {
    cValue: {
      get () { return this.values.iso },
      set (original) {
        let value = null
        let isDateValid = true
        let isTimeValid = true
        let hour = -1
        let minute = -1
        let second = -1
        if (original) {
          if (!this.dateOptions || this.dateOptions.length === 0 || !this.values.date || !this.displayDatePicker) {
            isDateValid = true
          } else if (typeof this.dateOptions === 'function') {
            isDateValid = this.dateOptions(this.values.date)
          } else {
            isDateValid = this.dateOptions.indexOf(this.values.date) !== -1
          }
        
          if (this.values.time) {
            let time = this.values.time.split(':')
            hour = this.__parseIntFromArray(time, 0, 0)
            minute = this.__parseIntFromArray(time, 1, 0)
            second = this.__parseIntFromArray(time, 2, 0)
          }
          if (!this.timeOptions || this.timeOptions.length === 0 || hour === -1 || !this.displayTimePicker) {
            isTimeValid = true
          } else if (typeof this.timeOptions === 'function') {
            isTimeValid = this.timeOptions(hour, minute, second)
          } else {
            isTimeValid = this.timeOptions.indexOf({ hour, minute, second }) !== -1
          }
         
          if (isTimeValid && isDateValid) {
            let [ date, time ] = original.split('T')
            time = time.substring(0, 5)
            if (this.track.format == 'quasar') {
              date = date.replace(/-/g, '/')
            }
            if (!this.track.hasSeparator) {
              value = this.mode === 'date' ? date : time
            } else {
              let sepatator = this.track.format == 'iso' ? 'T' : ' '
              value = date + sepatator + time
            }
          }
        }
        if (isTimeValid && isDateValid) {
          this.$emit('input', value)
        }
      }
    },
    displayDatePicker () {
      return ["date", "datetime"].indexOf(this.mode) !== -1
    },
    displayTimePicker () {
      return ["time", "datetime"].indexOf(this.mode) !== -1
    },
    dateIntlOptions () {
      return this.displayDatePicker ? { day: '2-digit', month: '2-digit', year: 'numeric' } : {}
    },
    timeIntlOptions () {
      return this.displayTimePicker ? { hour: '2-digit', minute: '2-digit', hour12: false /*!this.format24h*/ } : {}
    },
    intlOptions () {
      return { ...this.dateIntlOptions, ...this.timeIntlOptions }
    },
    intlLocaleOptions () {
      var intlLocale = 'gregory'
      switch (this.calendar) {
        case 'gregorian': intlLocale = 'gregory'; break;
        case 'persian': intlLocale = 'persian'; break;
      }
      return `-u-ca-${intlLocale}-nu-latn`
    },
    language () {
      return (this.lang || this.$q.lang.isoName || navigator.language) + this.intlLocaleOptions
    },
    intlDateFormatter () {
      return new Intl.DateTimeFormat(this.language, this.dateIntlOptions)
    },
    intlTimeFormatter () {
      return new Intl.DateTimeFormat(this.language, this.timeIntlOptions)
    },
    intlDisplayFormatter () {
      let lang = this.language.replace(this.intlLocaleOptions, '')
      return new Intl.DateTimeFormat(lang, this.intlOptions)
    },
    mask () {
      if (this.masks.date && this.masks.time) {
        return `${this.masks.date} ${this.masks.time}`
      } else {
        return this.masks.date || this.masks.time
      }
    }    
  },
  methods: {
    __sleep (delay) {
      return new Promise(resolve => window.setTimeout(resolve, delay))
    },
    async __updatePosition () {
      await this.$nextTick()
      if (!this.popup || !this.$refs.card) {
        return
      }
      let wrapper = this.$refs.card.$parent.$el
      if (!wrapper.classList.contains('q-menu')) {
        return
      }
      let height = Math.round(dom.height(this.$refs.card.$el))
      await this.__sleep(10)
      let offset = dom.offset(wrapper)
      if (this.target === 'self') {
        let minWidth = dom.style(wrapper, "min-width")
        wrapper.style.maxWidth = minWidth
      } else {
        wrapper.style.maxWidth = null
      }
      if (offset.top + height > window.innerHeight) {
        let top = (height + 50) > window.innerHeight ? 25 : window.innerHeight - height - 25
        wrapper.style.top = top + 'px'
      }
    },
    async __onOpen () {
      this.popup = true
      this.__updatePosition()
      this.tab = 'date'
    },
    async __onClose () {
      this.popup = false
      this.__updatePosition()
      this.tab = 'date'
    },
    __resetValues () {
      this.masked = ''
      this.display = ''
      this.inputs.date = ''
      this.inputs.time = ''
      this.values.date = ''
      this.values.time = ''
      this.values.iso = ''
    },
    __onValueUpdated (value) {
      this.track.format = this.track.format || this.defaultStandard
      this.track.hasSeparator = this.mode === 'datetime'

      if (!value) {
        this.__resetValues()
        return
      }
      
      if (this.displayDatePicker) {
        this.track.format = value.indexOf('-') !== -1 ? 'iso' : 'quasar'
      }
      var separator = this.track.format === 'iso' ? 'T' : ' '
      this.track.hasSeparator = value.indexOf(separator) !== -1
      this.values.iso = (() => {
        switch (this.track.format) {
          case 'iso': return value
          case 'quasar': return value.replace(/[\\/]/g, '-').replace(' ', 'T')
        }
      })()

      if (!this.track.hasSeparator) {
        this.values.iso = (() => {
          switch (this.mode) {
            case 'time': return '1970-01-01T' + this.values.iso
            case 'date': return this.values.iso + 'T00:00:00'
          }
        })()
      }
      
      let date = new Date(this.values.iso)
      this.__intlFormat(date)
      this.$nextTick().then(() => {
        this.__onInput()
      })
    },
    __setupLanguage () {
      let isoName = this.$q.lang.isoName || this.lang || navigator.language
      let lang
      try {
        lang = require(`./lang/${isoName}`)
      } catch (e) {
        lang = require(`./lang/en-us`)
      }
      this.$set(this, 'isoLang', lang.default)
    },
    __onInput () {
      if (this.clearable && (this.masked || '').length === 0) {
        this.cValue = null
      } else if (this.masks.date && this.masks.time) {
        let value = this.masked.trim()
        if (value.length === this.mask.length) {
          let date = this.masked.substring(0, this.masks.date.length)
          let time = this.masked.substring(this.masks.date.length + 1)
          this.__onInputTime(time)
          this.__onInputDate(date)
        } else if (value.length === this.masks.date.length) {
          this.__onInputDate(value)
        }
      } else if (this.masks.date) {
        this.__onInputDate(this.masked)
      } else {
        this.__onInputTime(this.masked)
      }
    },
    __onInputDate (date) {
      if (this.inputs.date !== date) {
        this.inputs.date = date
        if (date.length === this.masks.date.length) {
          let meta = this.metas.date
          let parts = date.split(meta.separator)
          let year = meta.year.order === -1 ? '1970' : parts[meta.year.order]
          let month = meta.month.order === -1 ? '01' : parts[meta.month.order]
          let day = meta.day.order === -1 ? '01' : parts[meta.day.order]
          this.$nextTick().then(() => {
            this.values.date = `${year}/${month}/${day}`
            this.__onDateChange()
          })
        }
      }
    },
    __onInputTime (time) {
      if (this.inputs.time !== time) {
        this.inputs.time = time
        if (time.length === this.masks.time.length) {
          let meta = this.metas.time
          let parts = time.split(meta.separator)
          let hour = meta.hour.order === -1 ? '00' : parts[meta.hour.order]
          let minute = meta.minute.order === -1 ? '00' : parts[meta.minute.order]
          let second = meta.second.order === -1 ? '00' : parts[meta.second.order]
          this.$nextTick().then(() => {
            this.values.time = `${hour}:${minute}:${second}`
            this.__onTimeChange()
          })
        }
      }
    },
    __onSetClick () {
      if (this.tab === 'date') {
        this.__onDateChange()
      } else {
        this.__onTimeChange()
      }
      if (this.mode === 'datetime' && this.tab === 'date') {
        this.tab = 'time'
      } else {
        this.$refs.popup.hide()
      }
    },
    __parseIntFromArray (list, index, defaultValue) {
      return list.length > index && list[index] ? parseInt(list[index]) : (defaultValue || 0)
    },
    __onDateChange () {
      this.__onChange()
    },
    __onTimeChange () {
      this.__onChange()
    },
    __intlFormat (date) {
      if (typeof this.displayValue === 'string') {
        this.display = this.displayValue
      } else {
        if (this.displayValue || this.target === 'self') {
          this.display = this.intlDisplayFormatter.format(date)
        } else {
          this.display = ''
        }
      }
      let self = this
      this.masked = (() => {
        switch (self.mode) {
          case 'datetime': return self.intlDateFormatter.format(date) + ' ' + self.intlTimeFormatter.format(date)
          case 'date': return self.intlDateFormatter.format(date)
          case 'time': return self.intlTimeFormatter.format(date)
        }
      })()
    },
    __onChange () {
      let date = this.values.date.split('/')
      let year = this.__parseIntFromArray(date, 0, 1970)
      let month = this.__parseIntFromArray(date, 1, 1) - 1
      let day = this.__parseIntFromArray(date, 2, 1)

      let time = this.values.time.split(':')
      let hour = this.__parseIntFromArray(time, 0, 0)
      let minute = this.__parseIntFromArray(time, 1, 0)
      let second = this.__parseIntFromArray(time, 2, 0)
      
      let dateObj = new Date(year, month, day, hour, minute, second)
      this.__intlFormat(dateObj)
      this.values.iso = toISOString(dateObj)
      this.cValue = this.values.iso
      this.__updatePosition()
    },
    __updateMetadata () {
      this.__updateDateMetadata()
      this.__updateTimeMetadata()
    },
    __updateDateMetadata () {
      let meta = {}
      let mask = ''
      if (this.displayDatePicker) {
        let formatter = new Intl.DateTimeFormat(this.language, this.dateIntlOptions)

        let date = new Date(2048, 11, 24)
        let formatted = formatter.format(date)
        let yearCases = formatted.indexOf('2048') !== -1 ? 4 : 2
        meta.separator = '',
        meta.year = {
          pos: yearCases === 4 ? formatted.indexOf('2048') : formatted.indexOf('48'),
          cases: yearCases,
          order: -1
        }
        meta.month = {
          pos: formatted.indexOf('12'),
          cases: 2,
          order: -1
        }
        meta.day = {
          pos: formatted.indexOf('24'),
          cases: 2,
          order: -1
        }
        let limit = [ meta.year, meta.month, meta.day ].filter(meta => meta.pos !== -1).length
        let getNextIndex = (index) => {
          let next = [meta.day, meta.month, meta.year].filter(part => part.pos > index).sort((partA, partB) => partA.pos - partB.pos)[0]
          if (next) {
            return next.pos
          } else {
            return formatted.length
          }
        }
        let _index = 0
        for (let i = 0; i < limit; i++) {
          if (meta.day.pos == _index) {
            meta.day.order = i
            mask = mask + ''.padStart(meta.day.cases, '#')
            if (i < limit - 1) {
              _index += meta.day.cases
              let nextIndex = getNextIndex(_index)
              meta.separator = formatted.substring(_index, nextIndex)
              _index = nextIndex
              mask = mask + meta.separator
            }
          } else if (meta.month.pos == _index) {
            meta.month.order = i
            mask = mask + ''.padStart(meta.month.cases, '#')
            if (i < limit - 1) {
              _index += meta.month.cases
              let nextIndex = getNextIndex(_index)
              meta.separator = formatted.substring(_index, nextIndex)
              _index = nextIndex
              mask = mask + meta.separator
            }
            continue
          } else if (meta.year.pos == _index) {
            meta.year.order = i
            mask = mask + ''.padStart(meta.year.cases, '#')
            if (i < limit - 1) {
              _index += meta.year.cases
              let nextIndex = getNextIndex(_index)
              meta.separator = formatted.substring(_index, nextIndex)
              _index = nextIndex
              mask = mask + meta.separator
            }
          }
        }
      }
      this.$set(this.masks, 'date', mask)
      this.$set(this.metas, 'date', meta)
    },
    __updateTimeMetadata () {
      let meta = {}
      let mask = ''
      if (this.displayTimePicker) {
        let formatter = new Intl.DateTimeFormat(this.language, this.timeIntlOptions)
        let date = new Date(2011, 11, 11, 12, 24, 48)
        let formatted = formatter.format(date)
        meta.separator = ''
        meta.hour = {
          pos: formatted.indexOf('12'),
          cases: 2,
          order: -1
        }
        meta.minute = {
          pos: formatted.indexOf('24'),
          cases: 2,
          order: -1
        }
        meta.second = {
          pos: formatted.indexOf('48'),
          cases: 2,
          order: -1
        }
        let limit = [ meta.hour, meta.minute, meta.second ].filter(meta => meta.pos !== -1).length
        
        let _index = 0
        for (let i = 0; i < limit; i++) {
          if (meta.hour.pos == _index) {
            meta.hour.order = i
            mask = mask + ''.padStart(meta.hour.cases, '#')
            if (i < limit - 1) {
              _index += meta.hour.cases
              meta.separator = formatted.substring(_index, ++_index)
              mask = mask + meta.separator
            }
          } else if (meta.minute.pos == _index) {
            meta.minute.order = i
            mask = mask + ''.padStart(meta.minute.cases, '#')
            if (i < limit - 1) {
              _index += meta.minute.cases
              meta.separator = formatted.substring(_index, ++_index)
              mask = mask + meta.separator
            }
            continue
          } else if (meta.second.pos == _index) {
            meta.second.order = i
            mask = mask + ''.padStart(meta.second.cases, '#')
            if (i < limit - 1) {
              _index += meta.ysecondear.cases
              meta.separator = formatted.substring(_index, ++_index)
              mask = mask + meta.separator
            }
          }
        }
      }

      this.$set(this.masks, 'time', mask)
      this.$set(this.metas, 'time', meta)
    },
    __clearValue () {
      this.cValue = ''
    }
  },
  render (h) {
    let self = this
    let inputFields = fields.reduce((props, field) => {
      props[field] = self[field]
      return props
    }, {})

    if (self.rules) {
      inputFields.rules = self.rules.map(rule => {
        return (val) => {
          return rule(self.value)
        }
      })
    }

    let _renderInput = self.target === 'self' || self.displayValue !== false ? renderReadonlyInput : renderInput
    let clearBtn = h(QIcon, {
      staticClass: 'cursor-pointer',
      props: { name: this.clearIcon || this.$q.iconSet.field.clear },
      on: {
        click: this.__clearValue
      }
    })

    return h('div', {
      class: 'q-datetimepicker'
    }, [
      _renderInput(self, h, inputFields, {
        append (props) {
          let icons = []
          var pickerbtn = h(QIcon, {
            class: {
              'cursor-pointer': true
            },
            props: {
              name: self.icon || (self.mode === 'time' ? 'access_time' : 'event' )
            }
          }, self.target === 'self' ? [] : renderPopupProxy(self, h))
          if (self.cValue && self.target === 'self' && self.clearable) {
            icons.push(clearBtn)
          }
          icons.push(pickerbtn)
          return icons
        }
      }, self.target === 'self' ? renderPopupProxy(self, h) : [])
    ])
  }
})
