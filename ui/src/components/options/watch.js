import meta from '../../utils/meta'

export default {
  '__properties.defaultStandard': {
    immediate: true,
    handler () {
      if (!this.value) {
        this.standard = this.__properties.defaultStandard 
      } else {
        let standard = this.__properties.defaultStandard 
        switch (true) {
          case this.value.indexOf('-') !== -1: standard = 'iso'; break
          case this.value.indexOf('/') !== -1: standard = 'quasar'; break
        }
        this.standard = standard
      }
    }
  },
  language: {
    immediate: true,
    handler () {
      let date = { meta: {}, mask: '' }
      let time = { meta: {}, mask: '' }
      let ampm = { am: 'AM', am: 'PM', suffix: true }

      if (this.displayDate) {
        date = meta.date({ language: this.language, options: this.intlDateOptions })
      }
      if (this.displayTime) {
        time = meta.time({ language: this.language, options: this.intlTimeOptions })
      }
      if (!this.format24h) {
        ampm = meta.ampm({ language: this.language, options: this.intlTimeOptions })
      }

      this.$set(this.metas, 'date', date.meta)
      this.$set(this.masks, 'date', date.mask)
      this.$set(this.metas, 'time', time.meta)
      this.$set(this.masks, 'time', time.mask)
      this.$set(this.metas, 'ampm', ampm)
      this.__configLanguage()
      this.configured = true
      this.__updateValue(true)
    }
  },
  value: {
    immediate: true,
    handler () {
      if (this.configured) {
        this.__updateValue()
      }
    }
  }
}