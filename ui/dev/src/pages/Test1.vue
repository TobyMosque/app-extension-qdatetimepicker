<template>
  <q-page padding>
    <div class="row q-col-gutter-sm">
      <div class="col col-6">
        <ThemeEditor name="Light" field="light" />
      </div>
      <div class="col col-6">
        <ThemeEditor name="Dark" field="dark" />
      </div>
      <div class="col col-4">
        <ThemeViewer name="Date & Time (ISO)" mode="datetime" />
      </div>
      <div class="col col-4">
        <ThemeViewer name="Date (ISO)" mode="date" />
      </div>
      <div class="col col-4">
        <ThemeViewer name="Time (ISO)" mode="time" />
      </div>
      <div class="col col-4">
        <ThemeViewer name="Date & Time (Quasar)" standard="quasar" mode="datetime" />
      </div>
      <div class="col col-4">
        <ThemeViewer name="Date (Quasar)" standard="quasar" mode="date" />
      </div>
      <div class="col col-4">
        <ThemeViewer name="Time (Quasar)" standard="quasar" mode="time" />
      </div>
    </div>
  </q-page>
</template>

<script>
import ThemeEditor from '../components/ThemeEditor.vue'
import ThemeViewer from '../components/ThemeViewer.vue'

export default {
  components: {
    ThemeEditor,
    ThemeViewer
  }
}
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
