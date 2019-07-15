<template>
  <q-form ref="form" class="col col-4 q-pa-md q-gutter-y-sm bg-grey-2" :class="{ 'bg-grey-2': !dark, 'bg-grey-9': dark }">
    <template v-if="mode !== 'date' || !this.format24h">
      <q-datetime-picker :mode="mode" :rules="rules" :color="color" :date-options="dateOptions" :time-options="timeOptions" :default-standard="standard" :format24h="format24h" :display-value="displayValue" :dark="dark" outlined clearable v-model="__value" :label="`${prefix} Standard Datepicker`"></q-datetime-picker>
      <q-datetime-picker :mode="mode" :rules="rules" :color="color" :date-options="dateOptions" :time-options="timeOptions" :default-standard="standard" :format24h="format24h" :display-value="displayValue" :dark="dark" outlined clearable v-model="__value" :label="`${prefix} Classic Datepicker`" target="self"></q-datetime-picker>
      <q-datetime-picker :mode="mode" :rules="rules" :color="color" :date-options="dateOptions" :time-options="timeOptions" :default-standard="standard" :format24h="format24h" :display-value="displayValue" :dark="dark" outlined clearable v-model="__value" :label="`${prefix} Minimal Datepicker`" minimal></q-datetime-picker>
      <q-datetime-picker :mode="mode" :rules="rules" :color="color" :date-options="dateOptions" :time-options="timeOptions" :default-standard="standard" :format24h="format24h" :display-value="displayValue" :dark="dark" outlined clearable v-model="__value" :label="`${prefix} Auto Set Datepicker`" auto-update-value></q-datetime-picker>
      <q-datetime-picker :mode="mode" :rules="rules" :color="color" :date-options="dateOptions" :time-options="timeOptions" :default-standard="standard" :format24h="format24h" :display-value="displayValue" :dark="dark" outlined clearable v-model="__value" :label="`${prefix} Landscape Datepicker`" landscape></q-datetime-picker>
      <q-datetime-picker :mode="mode" :rules="rules" :color="color" :date-options="dateOptions" :time-options="timeOptions" :default-standard="standard" :format24h="format24h" :display-value="displayValue" :dark="dark" outlined clearable v-model="__value" :label="`${prefix} Classic Landscape Datepicker`" landscape target="self"></q-datetime-picker>
    </template>
    <template v-if="rules && rules.length">
      <q-btn type="submit" :color="color" class="full-width" label="submit" @click="submit"></q-btn>
    </template>
  </q-form>
</template>

<style>

</style>

<script>
export default {
  name: 'PageIndex',
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'date'
    },
    color: {
      type: String,
      default: 'primary'
    },
    format24h: {
      type: Boolean,
      default: false
    },
    standard: {
      type: String,
      default: 'iso'
    },
    displayValue: {
      type: [Boolean, String],
      default: false
    },
    rules: Array,
    dateOptions: Function,
    timeOptions: Function,
    value: String
  },
  computed: {
    __value: {
      get () { return this.value },
      set (value) { return this.$emit('input', value) }
    },
    prefix () {
      return this.dark ? 'Dark' : 'Light'
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate()
    }
  }
}
</script>
