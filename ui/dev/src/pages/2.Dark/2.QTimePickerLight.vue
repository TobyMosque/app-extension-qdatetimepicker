<template>
  <q-page padding>
    <QDatetimePickerGroup dark mode="time" v-model="iso.time" />
  </q-page>
</template>

<script>
import data from '../data'
import mixin from '../mixin'
import QDatetimePickerGroup from 'src/components/QDatetimePickerGroup.vue'

export default {
  name: 'PageDarkQTimePicker',
  mixins: [mixin],
  components: {
    QDatetimePickerGroup
  },
  data () {
    return data
  }
}
</script>
