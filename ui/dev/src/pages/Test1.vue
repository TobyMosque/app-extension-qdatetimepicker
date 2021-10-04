<template>
  <q-page padding>
    <QDateTimePicker mode="datetime" :value="date" :label="label" />
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      date: ref('1984-11-02'),
      label: ref('Hello World')
    }
  }
}
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
