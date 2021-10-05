<template>
  <q-card>
    <q-card-section class="text-h6">{{name}} Theme</q-card-section>
    <q-separator />
    <q-card-section class="row q-col-gutter-sm">
      <div class="col col-3">
        <q-checkbox label="Filled" v-model="theme.filled" />
      </div>
      <div class="col col-3">
        <q-checkbox label="Outlined" v-model="theme.outlined" />
      </div>
      <div class="col col-3">
        <q-checkbox label="Borderless" v-model="theme.borderless" />
      </div>
      <div class="col col-3">
        <q-checkbox label="Standout" v-model="theme.standout" />
      </div>
      <div class="col col-3">
        <q-checkbox label="Dark" toggle-indeterminate v-model="theme.dark" />
      </div>
      <div class="col col-3">
        <q-checkbox label="Dense" v-model="theme.dense" />
      </div>
      <div class="col col-3">
        <q-checkbox label="Rounded" v-model="theme.rounded" />
      </div>
      <div class="col col-3">
        <q-checkbox label="Square" v-model="theme.square" />
      </div>
      <div class="col col-3">
        <q-checkbox label="Format 24h" toggle-indeterminate v-model="theme.format24h" />
      </div>
      <div class="col col-3">
        <q-checkbox label="Clearable" v-model="theme.clearable" />
      </div>
      <div class="col col-3">
        <q-checkbox label="Landscape" v-model="theme.landscape" />
      </div>
      <div class="col col-3">
        <q-checkbox label="Hide Bottom Space" v-model="theme.hideBottomSpace" />
      </div>
    </q-card-section>
    <q-card-section class="row q-col-gutter-sm">
      <div class="col col-6">
        <q-input label="Input Class" filled v-model="theme.inputClass" />
      </div>
      <div class="col col-6">
        <q-input label="Input Style" filled v-model="theme.inputStyle" />
      </div>
      <div class="col col-4">
        <q-input label="Label Color" filled v-model="theme.labelColor" />
      </div>
      <div class="col col-4"> 
        <q-input label="Color" filled v-model="theme.color" />
      </div>
      <div class="col col-4">
        <q-input label="Background Color" filled v-model="theme.bgColor" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { QDTP_DEFAULTS } from 'ui' // "ui" is aliased in quasar.conf.js
import { ref, inject } from 'vue'

export default {
  props: {
    name: String,
    field: String
  },
  setup (props) {
    const qdtp = inject(QDTP_DEFAULTS)
    return {
      theme: qdtp[props.field],
      name: ref(props.name)
    }
  }
}
</script>
