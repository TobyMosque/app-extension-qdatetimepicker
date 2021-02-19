<template>
  <q-page padding>
    <QDatetimePickerGroup color="negative" :display-value="displayTime" mode="time" v-model="iso.time" />
  </q-page>
</template>

<script>
import data from '../data'
import mixin from '../mixin'
import QDatetimePickerGroup from 'src/components/QDatetimePickerGroup.vue'

export default {
  name: 'PageCustomFormatQTimePicker',
  mixins: [mixin],
  components: {
    QDatetimePickerGroup
  },
  data () {
    return data
  }
}
</script>
