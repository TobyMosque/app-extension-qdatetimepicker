export default {
  watch: {
    '$q.lang.isoName': {
      immediate: true,
      handler (value) {
        if (this.language !== value) {
          this.language = value
        }
      }
    }
  },
  computed: {
    displayDate () {
      return 'iso: ' + this.iso.date
    },
    displayTime () {
      return 'iso: ' + this.iso.time
    },
    displayDatetime () {
      return 'iso: ' + this.iso.datetime
    }
  },
  methods: {
    async onLanguageInput () {
      let lang = await import('quasar/lang/' + this.language)
      this.$q.lang.set(lang.default)
    },
    dateOptions (date) {
      const parts = date.split('/')
      return parts[2] % 2 === 0
    },
    timeOptions (hr, min, sec) {
      return hr % 2 === 0
    }
  }
}