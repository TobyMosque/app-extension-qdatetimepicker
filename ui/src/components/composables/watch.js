import { watch } from 'vue'
import meta from '../../utils/meta'

export default function useWatch({ props, data, computed, methods }) {
  watch(() => computed.__properties.value.defaultStandard, () => {
    if (!props.value) {
      data.standard.value = computed.__properties.value.defaultStandard
    } else {
      let standard = computed.__properties.value.defaultStandard
      switch (true) {
        case props.value.indexOf('-') !== -1: standard = 'iso'; break
        case props.value.indexOf('/') !== -1: standard = 'quasar'; break
      }
      data.standard.value = standard
    }
  }, { immediate: true })

  watch(() => props.language, () => {
    let date = { meta: {}, mask: '' }
    let time = { meta: {}, mask: '' }
    let ampm = { am: 'AM', am: 'PM', suffix: true }

    if (computed.displayDate.value) {
      date = meta.date({ language: props.language, options: computed.intlDateOptions.value })
    }
    if (computed.displayTime.value) {
      time = meta.time({ language: props.language, options: computed.intlTimeOptions.value })
    }
    if (!props.format24h) {
      ampm = meta.ampm({ language: props.language, options: computed.intlTimeOptions.value })
    }

    data.metas.value.date = date.meta
    data.masks.value.date = date.mask
    data.metas.value.time = time.meta
    data.masks.value.time = time.mask
    data.metas.value.ampm = ampm
    methods.__configLanguage()
    data.configured.value = true
    methods.__updateValue(true)
  }, { immediate: true })

  watch(() => props.value, () => {
    methods.__updateValue()
  }, { immediate: true })
}
