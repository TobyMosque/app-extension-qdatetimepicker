import Vue from 'vue'
import { debounce } from 'quasar'

import {
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
  .filter(field => [ 'error', 'errorMessage', 'noErrorIcon', 'rules', 'lazyRules', 'value' ].indexOf(field) === -1)

const renderDate = function (self, h) {
  return [
    h(QDate, {
      props: {
        dark: self.dark,
        color: self.color,
        value: self.values.date
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
        format24h: self.format24h
      },
      on: {
        input (value) { self.values.time = value }
      }
    }, [])
  ]
}

const renderDateTime = function (self, h) {
  return [
    h(QTabs, {
      class: `bg-${self.color || 'primary'} text-white`,
      props: {
        value: self.tab,
        'narrow-indicator': true,
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
          icon: 'date_range',
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
    ]),
    h(QTabPanels, {
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
  ]
}

const toISOString = function (date) {
  if (!date || !date.getTimezoneOffset) {
    return null
  }
  var offset = date.getTimezoneOffset() * -1
  date = new Date(date.getTime() + offset * 60000)
  date = date.toISOString().replace('Z', '')

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
    format24h: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.__updateMetadata()
    this.__setupLanguage()
  },
  data () {
    return {
      tab: 'date',
      masked: '',
      inputs: {
        date: '',
        time: ''
      },
      values: {
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
      get () { return this.value },
      set (value) {
        this.$emit('input', value)
      }
    },
    date () {
      return ["date", "datetime"].indexOf(this.mode) !== -1
    },
    time () {
      return ["time", "datetime"].indexOf(this.mode) !== -1
    },
    dateIntlOptions () {
      return this.date ? { day: '2-digit', month: '2-digit', year: 'numeric' } : {}
    },
    timeIntlOptions () {
      return this.time ? { hour: '2-digit', minute: '2-digit', hour12: false /*!this.format24h*/ } : {}
    },
    intlOptions () {
      return { ...this.dateIntlOptions, ...this.timeIntlOptions }
    },    
    language () {
      return (this.lang || this.$q.lang.isoName || navigator.language) + '-u-ca-gregory-nu-latn'
    },
    intlDateFormatter () {
      return new Intl.DateTimeFormat(this.language, this.dateIntlOptions)
    },
    intlTimeFormatter () {
      return new Intl.DateTimeFormat(this.language, this.timeIntlOptions)
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
    __onOpen () {
      this.tab = 'date'
    },
    __onValueUpdated (value) {
      if (!value) {
        this.masked = ''
        return
      }

      let isoSeparator = value.indexOf('T')
      let date = null
      if (isoSeparator === -1) {
        if (!this.date) {
          value = '1970-01-01T' + value
        } else {
          value = value + 'T00:00:00'
        }
      }
      date = new Date(value)
      this.cValue = toISOString(date)

      this.__intlFormat(date)
      this.$nextTick().then(() => {
        this.__onInput()
      })
    },
    __setupLanguage () {
      let isoName = this.lang || this.$q.lang.isoName || navigator.language
      let lang
      try {
        lang = require(`./lang/${isoName}`)
      } catch (e) {
        lang = require(`./lang/en-us`)
      }
      this.$set(this, 'isoLang', lang.default)
    },
    __onInput () {
      if (this.masks.date && this.masks.time) {
        let value = this.masked.trim()
        if (value.length === this.mask.length) {
          let date = this.masked.substring(0, this.masks.date.length)
          let time = this.masked.substring(this.masks.date.length + 1)
          this.__onInputTime(time)
          this.__onInputDate(date)
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
      if (this.date && this.time && this.tab === 'date') {
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
      if (this.date && this.time) {
        this.masked = this.intlDateFormatter.format(date) + ' ' + this.intlTimeFormatter.format(date)
      } else if (!this.date) {
        this.masked = this.intlTimeFormatter.format(date)
      } else  {
        this.masked = this.intlDateFormatter.format(date)
      }
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
      
      var dateObj = new Date(year, month, day, hour, minute, second)
      this.__intlFormat(dateObj)
      this.cValue = toISOString(dateObj)
    },
    __updateMetadata () {
      this.__updateDateMetadata()
      this.__updateTimeMetadata()
    },
    __updateDateMetadata () {
      let meta = {}
      let mask = ''
      if (this.date) {
        var formatter = new Intl.DateTimeFormat(this.language, this.dateIntlOptions)

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
        var limit = [ meta.year, meta.month, meta.day ].filter(meta => meta.pos !== -1).length
        var getNextIndex = (index) => {
          var next = [meta.day, meta.month, meta.year].filter(part => part.pos > index).sort((partA, partB) => partA.pos - partB.pos)[0]
          if (next) {
            return next.pos
          } else {
            return formatted.length
          }
        }
        var _index = 0
        for (var i = 0; i < limit; i++) {
          if (meta.day.pos == _index) {
            meta.day.order = i
            mask = mask + ''.padStart(meta.day.cases, '#')
            if (i < limit - 1) {
              _index += meta.day.cases
              var nextIndex = getNextIndex(_index)
              meta.separator = formatted.substring(_index, nextIndex)
              _index = nextIndex
              mask = mask + meta.separator
            }
          } else if (meta.month.pos == _index) {
            meta.month.order = i
            mask = mask + ''.padStart(meta.month.cases, '#')
            if (i < limit - 1) {
              _index += meta.month.cases
              var nextIndex = getNextIndex(_index)
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
              var nextIndex = getNextIndex(_index)
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
      if (this.time) {
        var formatter = new Intl.DateTimeFormat(this.language, this.timeIntlOptions)
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
        var limit = [ meta.hour, meta.minute, meta.second ].filter(meta => meta.pos !== -1).length
        
        var _index = 0
        for (var i = 0; i < limit; i++) {
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
    }
  },
  render (h) {
    let self = this

    let renderContent = renderDate;
    if (!self.date && !!self.time) {
      renderContent = renderTime
    }
    if (!!self.date && !!self.time) {
      renderContent = renderDateTime
    }

    let inputFields = fields.reduce((props, field) => {
      props[field] = self[field]
      return props
    }, {})

    return h('div', {
      class: 'q-datetimepicker'
    }, [
      h(QInput, { 
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
        scopedSlots: {
          append (props) {
            return [
              h(QIcon, {
                class: {
                  'cursor-pointer': true
                },
                props: {
                  name: 'event'
                }
              }, [
                h(QPopupProxy, {
                  ref: 'popup',
                  props: {
                    breakpoint: 600,
                  },
                  on: {
                    'before-show': self.__onOpen,
                    name: 'event'
                  }
                }, [
                  h(QCard, {
                    ref: 'card',
                    class: 'q-datetimepicker',
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
              ])
            ]
          }
        }
      }, [])
    ])
  }
})
