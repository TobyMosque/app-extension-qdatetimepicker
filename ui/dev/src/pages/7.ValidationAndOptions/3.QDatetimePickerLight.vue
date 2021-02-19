<template>
  <q-page padding>
    <QDatetimePickerGroup dark color="positive" :rules="rules" mode="datetime" v-model="quasar.datetime" :date-options="dateOptions" :time-options="timeOptions" />
  </q-page>
</template>

<script>
import data from '../data'
import mixin from '../mixin'
import QDatetimePickerGroup from 'src/components/QDatetimePickerGroup.vue'

export default {
  name: 'PageValidationAndOptionsQDatetimePicker',
  mixins: [mixin],
  components: {
    QDatetimePickerGroup
  },
  data () {
    return data
  }
}
</script>
