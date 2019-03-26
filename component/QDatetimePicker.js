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

export default Vue.extend({
  name: 'QDatetimePicker',
  mixins: [ QField ],
  props: {
    lang: String,
    date: {
      type: Boolean | Object,
      default: true
    },
    time: {
      time: Boolean | Object,
      default: false
    }
  },
  watch: {
    language (val) {
      // change lang
    },
  },
  computed: {
    dateIntlOptions () {
      if (!this.date) {
        return {}
      }
      if (this.date === true) {
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
    return h('div', {}, [
      h(QInput, { ref: 'input' }, [])
    ])
  }
})
