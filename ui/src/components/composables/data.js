import { reactive, toRefs } from 'vue'

export default function useData() {
  const data = reactive({
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
    masked: '',
    isoLang: {
      lang: '',
      dateTimePicker: {}
    }
  })
  return toRefs(data)
}