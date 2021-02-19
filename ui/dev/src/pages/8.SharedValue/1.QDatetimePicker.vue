<template>
  <q-page padding >
    <div class="q-mb-xl">
      <QDatetimePickerGroup v-model="iso.datetime" />
    </div>
    <div class="q-mb-xl">
      <QDatetimePickerGroup mode="time" v-model="iso.datetime" />
    </div>
    <div class="q-mb-xl">
      <QDatetimePickerGroup mode="datetime" v-model="iso.datetime" />
    </div>
  </q-page>
</template>

<script>
import data from '../data'
import mixin from '../mixin'
import QDatetimePickerGroup from 'src/components/QDatetimePickerGroup.vue'

export default {
  name: 'PageSharedValueQDatetimePicker',
  mixins: [mixin],
  components: {
    QDatetimePickerGroup
  },
  data () {
    return data
  }
}
</script>
