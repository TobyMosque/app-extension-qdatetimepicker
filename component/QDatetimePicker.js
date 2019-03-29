import Vue from 'vue'

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

const fields = Object.keys(QField.options.props).filter(field => ['value'].indexOf(field) === -1)
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
          label: 'Date'
        }
      }, []),
      h(QTab, {
        props: {
          name: 'time',
          icon: 'access_time',
          label: 'Time'
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

export default Vue.extend({
  name: 'QDatetimePicker',
  mixins: [ QField ],
  props: {
    value: String,
    lang: String,
    date: Boolean | Object,
    time: Boolean | Object,
    format24h: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.$watch(() => this.$q.lang.isoName, () => {
      console.log('m1: ', this.$q.lang.isoName)
    })
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
      }
    }
  },
  watch: {
    language: {
      immediate: true,
      handler () {
        console.log(this.$q.lang)
        this.updateMetadata()
      }
    },
    intlOptions () {
      this.updateMetadata()
    },
    masked () {
      if (this.masks.date && this.masks.time) {
        if (this.masked.indexOf(' ') !== -1) {
          var [ date, time ] = this.masked.split(' ')
          this.onInputDate(date)
          this.onInputTime(time)
        }
      } else if (this.masks.date) {
        this.onInputDate(this.masked)
      } else {
        this.onInputTime(this.masked)
      }
    }
  },
  computed: {
    dateIntlOptions () {
      if (!this.date && !!this.time) {
        return {}
      }
      if (!this.date || this.date === true) {
        return { day: '2-digit', month: '2-digit', year: 'numeric', }
      }
      return this.date
    },
    timeIntlOptions () {
      if (!this.time) {
        return {}
      }
      if (this.time === true) {
        return { hour: '2-digit', minute: '2-digit', hour12: !this.format24h }
      }
      return this.time
    },
    intlOptions () {
      return { ...this.dateIntlOptions, ...this.timeIntlOptions }
    },    
    language () {
      return (this.lang || this.$q.lang.isoName || navigator.language) + '-u-nu-latn'
    },
    intlFormatter () {
      return new Intl.DateTimeFormat(this.language, this.intlOptions)
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
    onOpen () {
      this.tab = 'date'
    },
    onInputDate (date) {
      if (this.inputs.date !== date) {
        this.inputs.date = date
        if (date.length === this.masks.date.length) {
          let meta = this.metas.date
          let parts = date.split(meta.separator)
          let year = meta.year.order === -1 ? '2000' : parts[meta.year.order]
          let month = meta.month.order === -1 ? '01' : parts[meta.month.order]
          let day = meta.day.order === -1 ? '01' : parts[meta.day.order]
          this.values.date = `${year}/${month}/${day}`
        }
      }
    },
    onInputTime (time) {
      if (this.inputs.time !== time) {
        this.inputs.time = time
        if (time.length === this.masks.time.length) {
          let meta = this.metas.time
          let parts = time.split(meta.separator)
          let hour = meta.hour.order === -1 ? '00' : parts[meta.hour.order]
          let minute = meta.minute.order === -1 ? '00' : parts[meta.minute.order]
          let second = meta.second.order === -1 ? '00' : parts[meta.second.order]
          this.values.time = `${hour}:${minute}:${second}`
        }
      }
    },
    onSetClick () {
      if (this.tab === 'date') {
        this.onDateChange()
      } else {
        this.onTimeChange()
      }
      if (this.date && this.time && this.tab === 'date') {
        this.tab = 'time'
      } else {
        this.$refs.popup.hide()
      }
    },
    parseIntFromArray (list, index, defaultValue) {
      return list.length > index && list[index] ? parseInt(list[index]) : (defaultValue || 0)
    },
    onDateChange () {
      this.onChange()
    },
    onTimeChange () {
      this.onChange()
    },
    onChange () {
      let date = this.values.date.split('/')
      let year = this.parseIntFromArray(date, 0, 2000)
      let month = this.parseIntFromArray(date, 1, 1) - 1
      let day = this.parseIntFromArray(date, 2, 1)

      let time = this.values.time.split(':')
      let hour = this.parseIntFromArray(time, 0, 0)
      let minute = this.parseIntFromArray(time, 1, 0)
      let second = this.parseIntFromArray(time, 2, 0)
      
      var dateObj = new Date(year, month, day, hour, minute, second)
      this.masked = this.intlFormatter.format(dateObj)
    },
    updateMetadata () {
      this.updateDateMetadata()
      this.updateTimeMetadata()
    },
    updateDateMetadata () {
      let meta = {}
      let mask = ''
      if (this.date || !this.time) {
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

        var _index = 0
        for (var i = 0; i < limit; i++) {
          if (meta.day.pos == _index) {
            meta.day.order = i
            mask = mask + ''.padStart(meta.day.cases, '#')
            if (i < limit - 1) {
              _index += meta.day.cases
              meta.separator = formatted.substring(_index, ++_index)
              mask = mask + meta.separator
            }
          } else if (meta.month.pos == _index) {
            meta.month.order = i
            mask = mask + ''.padStart(meta.month.cases, '#')
            if (i < limit - 1) {
              _index += meta.month.cases
              meta.separator = formatted.substring(_index, ++_index)
              mask = mask + meta.separator
            }
            continue
          } else if (meta.year.pos == _index) {
            meta.year.order = i
            mask = mask + ''.padStart(meta.year.cases, '#')
            if (i < limit - 1) {
              _index += meta.year.cases
              meta.separator = formatted.substring(_index, ++_index)
              mask = mask + meta.separator
            }
          }
        }
      }
      
      this.$set(this.masks, 'date', mask)
      this.$set(this.metas, 'date', meta)
    },
    updateTimeMetadata () {
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
          }
        },
        scopedSlots: {
          append (props) {
            return [
              h(QIcon, {
                props: {
                  class: 'cursor-pointer',
                  name: 'event'
                }
              }, [
                h(QPopupProxy, {
                  ref: 'popup',
                  on: {
                    'before-show': self.onOpen,
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
                      'before-show': self.onOpen,
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
                          click: self.onSetClick
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
