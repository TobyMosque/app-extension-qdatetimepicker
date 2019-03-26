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
  Qdate,
  QTime
} from 'quasar'

const fields = Object.keys(QField.options.props).filter(field => ['value'].indexOf(field) === -1)
console.log(fields)

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
      masked: ''
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
    let that = this

    let inputFields = fields.reduce((props, field) => {
      props[field] = that[field]
      return props
    }, {})

    return h('div', {}, [
      h(QInput, { 
        ref: 'input',
        props: {
          ...inputFields,
          value: self.masked
        },
        on: {
          input () { self.masked = event.target.value }
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
                  class: 'q-date-popup',
                  on: {
                    'before-show': that.onOpen,
                    name: 'event'
                  }
                }, [
                  h(QCard, {
                    ref: 'card',
                    class: 'q-date-popup',
                    on: {
                      'before-show': that.onOpen,
                      name: 'event'
                    }
                  }, [
                    h(QCardSection, {}, [
                      
                    ]),
                    h(QCardActions, {}, [
                      h(QBtn, {
                        props: {
                          flat: true,
                          color: 'default'
                        },
                        on: {
                          click () { that.$refs.popup.hide() }
                        },
                        scopedSlots: {
                          default (props) {
                            return 'Cancel'
                          }
                        }
                      }, [])
                      ,h(QBtn, {
                        props: {
                          flat: true,
                          color: 'primary'
                        },
                        on: {
                          click: that.onSetClick
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
