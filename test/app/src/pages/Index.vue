<template>
  <q-page class="flex flex-center">
    <div class="full-width row q-pa-md">
      <div class="col col-12 q-pa-md">
        <q-select
            outlined
            v-model="language"
            :options="languages"
            label="Language"
            option-label="nativeName"
            option-value="isoName"
            map-options
            emit-value
            @input="onLanguageInput">
        </q-select>
      </div>
      <q-form ref="form1" @submit="onSubmit($refs.form1)" class="col col-lg-3 col-md-6 col-12 q-pa-md" >
        <q-card>
          <q-card-section>
            <div class="text-h6">Input Types</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-datetime-picker class="q-mb-md" label="Standard Date Picker" v-model="date" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="Outlined Date Picker" v-model="date" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" filled label="Filled Date Picker" v-model="date" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" standout label="Standout Date Picker" v-model="date" :rules="rules" icon="date_range"></q-datetime-picker>
          </q-card-section>
          <q-card-actions>
            <q-btn label="Submit" type="submit" color="positive" class="full-width" />
          </q-card-actions>
        </q-card>
      </q-form>
      <q-form ref="form2" @submit="onSubmit($refs.form2)" class="col col-lg-3 col-md-6 col-12 q-pa-md" >
        <q-card dark class="bg-grey-10">
          <q-card-section>
            <div class="text-h6">Dark Mode</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section class="">
            <q-datetime-picker class="q-mb-md" outlined label="Date Picker" color="negative" dark v-model="date" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="Time Picker" mode="time" color="negative" dark v-model="time" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="DateTime Picker" mode="datetime" color="negative" dark v-model="datetime" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" standout label="Standout DateTime Picker" mode="datetime" color="negative" dark v-model="datetime" format24h clearable :rules="rules" icon="date_range"></q-datetime-picker>
          </q-card-section>
          <q-card-actions>
            <q-btn label="Submit" type="submit" dark color="negative" class="full-width" />
          </q-card-actions>
        </q-card>
      </q-form>
      <q-form ref="form3" @submit="onSubmit($refs.form3)" class="col col-lg-3 col-md-6 col-12 q-pa-md" >
        <q-card>
          <q-card-section>
            <div class="text-h6">Light Mode</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-datetime-picker class="q-mb-md" outlined landscape label="Date Picker" color="positive" v-model="date" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined landscape label="Time Picker" mode="time" color="positive" v-model="time" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined landscape label="DateTime Picker" mode="datetime" color="positive" v-model="datetime" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" standout landscape label="Standout DateTime Picker" mode="datetime" color="positive" v-model="datetime" format24h clearable :rules="rules" icon="date_range"></q-datetime-picker>
          </q-card-section>
          <q-card-actions>
            <q-btn label="Submit" type="submit" color="positive" class="full-width" />
          </q-card-actions>
        </q-card>
      </q-form>
      <q-form ref="form4" @submit="onSubmit($refs.form4)" class="col col-lg-3 col-md-6 col-12 q-pa-md" >
        <q-card dark class="bg-grey-10">
          <q-card-section>
            <div class="text-h6">Display Function</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section class="">
            <q-datetime-picker class="q-mb-md" outlined label="Date Picker" color="negative" dark v-model="date" :rules="rules" lang="ar-EG" display-value></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="Time Picker" mode="time" color="negative" dark v-model="time" :rules="rules" lang="ar-EG" display-value></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="DateTime Picker" mode="datetime" color="negative" dark v-model="datetime" :rules="rules" :display-value="datetime | displayFilter('ar-EG')"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" standout label="Standout DateTime Picker" mode="datetime" color="negative" dark v-model="datetime" format24h clearable :rules="rules" :display-value="displayValue" icon="date_range"></q-datetime-picker>
          </q-card-section>
          <q-card-actions>
            <q-btn label="Submit" type="submit" dark color="negative" class="full-width" />
          </q-card-actions>
        </q-card>
      </q-form>
      <div class="col col-md-6 col-12 q-pa-md">
        <q-banner rounded class="bg-primary text-white">
          <template v-slot:avatar>
            <q-avatar>
              <img src="https://cdn.quasar-framework.org/logo/svg/quasar-logo.svg">
            </q-avatar>
          </template>
          New to Quasar? Don't miss the chance to know the best Framework based on Vue
          <template v-slot:action>
            <a href="https://v1.quasar-framework.org">
              <q-btn flat color="white" label="Show me" />
            </a>
          </template>
        </q-banner>
      </div>
      <div class="col col-md-6 col-12 q-pa-md">
        <q-banner rounded class="bg-grey-10 text-white">
          <template v-slot:avatar>
            <q-avatar>
              <img src="statics/git-octupus.png">
            </q-avatar>
          </template>
          Quasar App Extension QDatetimePicker Repository
          <template v-slot:action>
            <a href="https://github.com/TobyMosque/app-extension-qdatetimepicker">
              <q-btn flat color="white" label="Show me" />
            </a>
          </template>
        </q-banner>
      </div>
    </div>
  </q-page>
</template>

<style>

</style>

<script>
// import something here
import languages from 'quasar/lang/index.json'
import { throttle } from 'quasar'
export default {
  name: 'PageIndex',
  data () {
    return {
      date: '2018-11-02',
      time: '15:46',
      rules: [
        (val) => !!val || 'Date is required'
      ],
      datetime: '2018-11-02T15:46',
      language: this.$q.lang.isoName,
      languages
    }
  },
  watch: {
    date: {
      immediate: true,
      handler () {
        console.log('date: ', this.date)
      }
    },
    time: {
      immediate: true,
      handler () {
        console.log('time: ', this.time)
      }
    },
    datetime: {
      immediate: true,
      handler () {
        console.log('datetime: ', this.datetime)
      }
    }
  },
  filters: {
    displayFilter (value, language) {
      return `iso: ${value} | ${language}: ${new Date(value).toLocaleString(language)}`
    }
  },
  computed: {
    displayValue () {
      return `iso: ${this.datetime} | i18n: ${new Date(this.datetime).toLocaleString(this.language)}`
    }
  },
  methods: {
    async onLanguageInput () {
      let lang = await import(`quasar/lang/${this.language}`)
      this.$q.lang.set(lang.default)
    },
    onSubmit: throttle(function (form) {
      form.validate().then(success => {
        if (success) {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Submitted'
          })
        }
      })
    }, 250)
  }
}
</script>
