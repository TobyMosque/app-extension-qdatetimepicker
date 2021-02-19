<template>
  <q-page padding>
    <QDatetimePickerGroup color="negative" dark :format24h="format24h" v-model="iso.date" />
  </q-page>
</template>

<script>
import data from '../data'
import mixin from '../mixin'
import QDatetimePickerGroup from 'src/components/QDatetimePickerGroup.vue'

export default {
  name: 'PageFormat24QDatePicker',
  mixins: [mixin],
  components: {
    QDatetimePickerGroup
  },
  data () {
    return data
  }
}
</script>
