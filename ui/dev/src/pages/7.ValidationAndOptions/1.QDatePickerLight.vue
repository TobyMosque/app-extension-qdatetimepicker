<template>
  <q-page padding>
    <QDatetimePickerGroup dark color="positive" :rules="rules" v-model="quasar.date" :date-options="dateOptions" />
  </q-page>
</template>

<script>
import data from '../data'
import mixin from '../mixin'
import QDatetimePickerGroup from 'src/components/QDatetimePickerGroup.vue'

export default {
  name: 'PageValidationAndOptionsQDatePicker',
  mixins: [mixin],
  components: {
    QDatetimePickerGroup
  },
  data () {
    return data
  }
}
</script>
