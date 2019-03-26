import Vue from 'vue'

import {
  QField,
  QInput,
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
} from Quasar

console.log(QField)

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
      maskedValue: ''
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
  render (h) {
    let that = this
    return h('div', {}, [
      h(QInput, { 
        ref: 'input',
        domProps: {
          value: self.maskedValue
        },
        on: {
          input () { self.maskedValue = event.target.value }
        },
        scopedSlots: {
          append (props) {
            return []
          }
        }
      }, [])
    ])
  }
})
