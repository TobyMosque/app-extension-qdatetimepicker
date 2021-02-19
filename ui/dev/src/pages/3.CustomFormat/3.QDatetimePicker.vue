<template>
  <q-page padding>
    <QDatetimePickerGroup color="negative" :display-value="displayTime" mode="datetime" v-model="iso.datetime" />
  </q-page>
</template>

<script>
import data from '../data'
import mixin from '../mixin'
import QDatetimePickerGroup from 'src/components/QDatetimePickerGroup.vue'

export default {
  name: 'PageCustomFormatQDatetimePicker',
  mixins: [mixin],
  components: {
    QDatetimePickerGroup
  },
  data () {
    return data
  }
}
</script>
