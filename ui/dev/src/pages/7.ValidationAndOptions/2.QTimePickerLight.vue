<template>
  <q-page padding>
    <QDatetimePickerGroup dark color="positive" :rules="rules" mode="time" standard="quasar" v-model="quasar.time" :time-options="timeOptions" />
  </q-page>
</template>

<script>
import data from '../data'
import mixin from '../mixin'
import QDatetimePickerGroup from 'src/components/QDatetimePickerGroup.vue'

export default {
  name: 'PageValidationAndOptionsQTimePicker',
  mixins: [mixin],
  components: {
    QDatetimePickerGroup
  },
  data () {
    return data
  }
}
</script>
