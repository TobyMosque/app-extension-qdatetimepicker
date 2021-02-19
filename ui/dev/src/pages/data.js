import Vue from 'vue'

export default Vue.observable({
  language: '',
  languages: [],
  format24h: true,
  iso: {
    date: '2018-11-02',
    time: '15:46',
    datetime: '2018-11-02T15:46'
  },
  quasar: {
    date: '2018/11/02',
    time: '15:46',
    datetime: '2018/11/02 15:46'
  },
  rules: [
    (val) => !!val || 'Date is required'
  ]
})
