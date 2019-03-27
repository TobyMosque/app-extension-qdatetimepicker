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
        value: self.dateValue
      },
      on: {
        input (event) { self.dateValue = event.target.value }
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
        value: self.timeValue,
        format24h: true
      },
      on: {
        input (event) { self.timeValue = event.target.value }
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
        input (event) {
          self.tab = event.target.value
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
    time: Boolean | Object
  },
  data () {
    return {
      tab: 'date',
      masked: '',
      dateValue: '',
      timeValue: ''
    }
  },
  watch: {
    language (val) {
      // change lang
    },
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
        return { hour: '2-digit', minute: '2-digit', }
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
    }
  },
  methods: {
    onOpen () {
      console.log('on open')
    },
    onSetClick () {
      console.log('set click')
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
          value: self.masked
        },
        on: {
          input (event) { self.masked = event.target.value }
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
                            return 'Cancel'
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
                            return 'Set'
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
