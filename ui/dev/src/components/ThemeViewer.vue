<template>
  <q-card>
    <q-card-section class="text-h6">{{name}} Mode</q-card-section>
    <q-separator />
    <q-card-section class="text-h6">
      <div class="col-12">
        <q-input disable filled v-model="value" label="Raw Value" />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="row q-col-gutter-sm">
      <div class="col-12">
        <QDateTimePicker :mode="mode" :default-standard="standard" v-model="value" label="Standard" />
      </div>
      <div class="col-12">
        <QDateTimePicker :mode="mode" :default-standard="standard" v-model="value" label="Classic (Target Self)" target="self" />
      </div>
      <div class="col-12">
        <QDateTimePicker :mode="mode" :default-standard="standard" v-model="value" label="Minimal" minimal />
      </div>
      <div class="col-12">
        <QDateTimePicker :mode="mode" :default-standard="standard" v-model="value" label="Auto Update" auto-update-value />
      </div>
      <div class="col-12">
        <QDateTimePicker :mode="mode" :default-standard="standard" v-model="value" label="Readonly" readonly />
      </div>
      <div class="col-12">
        <QDateTimePicker :mode="mode" :default-standard="standard" v-model="value" label="Disable" disable />
      </div>
      <div class="col-12">
        <QDateTimePicker :mode="mode" :default-standard="standard" v-model="value" label="Disable Popup" disable-popup />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    name: String,
    mode: String,
    standard: String
  },
  setup (props) {
    const standard = ref(props.standard ?? 'iso')
    const value = ref(standard.value === 'iso' ? '1984-11-02T05:00:00Z' : '1984/11/02 05:00:00')
    return {
      value: value,
      name: ref(props.name),
      mode: ref(props.mode),
      standard: standard
    }
  }
}
</script>
