<template>
  <QForm ref="form">
    <QCard class=" q-mt-md full-width bg-grey-2" :class="{ 'bg-grey-2': !dark, 'bg-grey-9': dark }">
      <QCardSection class="row q-col-gutter-md" v-if="mode !== 'date' || !this.format24h">
        <QDatetimePicker :class="colClass" :mode="mode" :rules="rules" :color="color" :date-options="dateOptions" :time-options="timeOptions" :default-standard="standard" :format24h="format24h" :display-value="displayValue" :dark="dark" outlined clearable v-model="__value" :label="`${prefix} Standard Datepicker`"></QDatetimePicker>
        <QDatetimePicker :class="colClass" :mode="mode" :rules="rules" :color="color" :date-options="dateOptions" :time-options="timeOptions" :default-standard="standard" :format24h="format24h" :display-value="displayValue" :dark="dark" outlined clearable v-model="__value" :label="`${prefix} Classic Datepicker`" target="self"></QDatetimePicker>
        <QDatetimePicker :class="colClass" :mode="mode" :rules="rules" :color="color" :date-options="dateOptions" :time-options="timeOptions" :default-standard="standard" :format24h="format24h" :display-value="displayValue" :dark="dark" outlined clearable v-model="__value" :label="`${prefix} Minimal Datepicker`" minimal></QDatetimePicker>
        <QDatetimePicker :class="colClass" :mode="mode" :rules="rules" :color="color" :date-options="dateOptions" :time-options="timeOptions" :default-standard="standard" :format24h="format24h" :display-value="displayValue" :dark="dark" outlined clearable v-model="__value" :label="`${prefix} Auto Set Datepicker`" auto-update-value></QDatetimePicker>
        <QDatetimePicker :class="colClass" :mode="mode" :rules="rules" :color="color" :date-options="dateOptions" :time-options="timeOptions" :default-standard="standard" :format24h="format24h" :display-value="displayValue" :dark="dark" outlined clearable v-model="__value" :label="`${prefix} Landscape Datepicker`" landscape></QDatetimePicker>
        <QDatetimePicker :class="colClass" :mode="mode" :rules="rules" :color="color" :date-options="dateOptions" :time-options="timeOptions" :default-standard="standard" :format24h="format24h" :display-value="displayValue" :dark="dark" outlined clearable v-model="__value" :label="`${prefix} Classic Landscape Datepicker`" landscape target="self"></QDatetimePicker>
        <QDatetimePicker :class="colClass" :mode="mode" :rules="rules" :color="color" :date-options="dateOptions" :time-options="timeOptions" :default-standard="standard" :format24h="format24h" :display-value="displayValue" :dark="dark" outlined clearable disable v-model="__value" :label="`${prefix} Readonly`"></QDatetimePicker>
        <QDatetimePicker :class="colClass" :mode="mode" :rules="rules" :color="color" :date-options="dateOptions" :time-options="timeOptions" :default-standard="standard" :format24h="format24h" :display-value="displayValue" :dark="dark" outlined clearable disable-popup v-model="__value" :label="`${prefix} No Popup`"></QDatetimePicker>
        <QDatetimePicker :class="colClass" :mode="mode" :rules="rules" :color="color" :date-options="dateOptions" :time-options="timeOptions" :default-standard="standard" :format24h="format24h" :display-value="displayValue" :dark="dark" outlined clearable readonly v-model="__value" :label="`${prefix} Disabled`"></QDatetimePicker>
      </QCardSection>
      <QCardActions v-if="rules && rules.length">
        <QBtn type="submit" :color="color" class="full-width" label="submit" @click="submit"></QBtn>
      </QCardActions>
    </QCard>
  </QForm>
</template>

<script>
import { QCard, QCardSection, QCardActions, QForm, QBtn } from 'quasar'
export default {
  name: 'QDatetimePickerGroup',
  components: {
    QForm,
    QBtn,
    QCard,
    QCardSection,
    QCardActions
  },
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
  data () {
    return {
      colClass: 'col col-12 col-sm-6 col-md-4 col-lg-3'
    }
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