<template>
  <q-page padding>
    <QDatetimePickerGroup color="negative" dark :format24h="format24h" mode="datetime" v-model="iso.datetime" />
  </q-page>
</template>

<script>
import data from '../data'
import mixin from '../mixin'
import QDatetimePickerGroup from 'src/components/QDatetimePickerGroup.vue'

export default {
  name: 'PageFormat24QDatetimePicker',
  mixins: [mixin],
  components: {
    QDatetimePickerGroup
  },
  data () {
    return data
  }
}
</script>
