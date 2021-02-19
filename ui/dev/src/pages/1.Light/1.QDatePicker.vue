<template>
  <q-page padding>
    <QDatetimePickerGroup v-model="iso.date" />
  </q-page>
</template>

<script>
import data from '../data'
import mixin from '../mixin'
import QDatetimePickerGroup from 'src/components/QDatetimePickerGroup.vue'

export default {
  name: 'PageLightQDatePicker',
  mixins: [mixin],
  components: {
    QDatetimePickerGroup
  },
  data () {
    return data
  }
}
</script>
