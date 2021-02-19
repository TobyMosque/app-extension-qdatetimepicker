<template>
  <q-page padding>
    <QDatetimePickerGroup color="positive" mode="time" standard="quasar" v-model="quasar.time" />
  </q-page>
</template>

<script>
import data from '../data'
import mixin from '../mixin'
import QDatetimePickerGroup from 'src/components/QDatetimePickerGroup.vue'

export default {
  name: 'PageValueFormatQTimePicker',
  mixins: [mixin],
  components: {
    QDatetimePickerGroup
  },
  data () {
    return data
  }
}
</script>
