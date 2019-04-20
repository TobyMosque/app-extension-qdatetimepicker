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
            <q-datetime-picker class="q-mb-md" label="Standard Date Picker" v-model="iso_date" :rules="rules" :date-options="dateFilter"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="Outlined Date Picker" mode="time" v-model="iso_time" :rules="rules" :time-options="timeFilter"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" filled label="Filled Date Picker" v-model="iso_date" :rules="rules" target="self" clearable></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" standout label="Standout Date Picker" mode="time" v-model="iso_time" :rules="rules" target="self"></q-datetime-picker>
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
            <q-datetime-picker class="q-mb-md" outlined label="Date Picker" color="negative" dark v-model="iso_date" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="Time Picker" mode="time" color="negative" dark v-model="iso_time" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="DateTime Picker" mode="datetime" color="negative" dark v-model="iso_datetime" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" standout label="Standout DateTime Picker" mode="datetime" color="negative" dark v-model="iso_datetime" format24h clearable :rules="rules" icon="date_range"></q-datetime-picker>
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
            <q-datetime-picker class="q-mb-md" outlined landscape label="Date Picker" color="positive" v-model="iso_date" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined landscape label="Time Picker" mode="time" color="positive" v-model="iso_time" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined landscape label="DateTime Picker" mode="datetime" color="positive" v-model="iso_datetime" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" standout landscape label="Standout DateTime Picker" mode="datetime" color="positive" v-model="iso_datetime" format24h clearable :rules="rules" icon="date_range"></q-datetime-picker>
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
            <q-datetime-picker class="q-mb-md" outlined label="Date Picker" color="negative" dark v-model="iso_date" :rules="rules" lang="ar-EG" display-value></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="Time Picker" mode="time" color="negative" dark v-model="iso_time" :rules="rules" lang="ar-EG" display-value></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="DateTime Picker" mode="datetime" color="negative" dark v-model="iso_datetime" :rules="rules" :display-value="iso_datetime | displayFilter('ar-EG')"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" standout label="Standout DateTime Picker" mode="datetime" color="negative" dark v-model="iso_datetime" format24h clearable :rules="rules" :display-value="displayValue" icon="date_range"></q-datetime-picker>
          </q-card-section>
          <q-card-actions>
            <q-btn label="Submit" type="submit" dark color="negative" class="full-width" />
          </q-card-actions>
        </q-card>
      </q-form>
      <q-form ref="form5" @submit="onSubmit($refs.form5)" class="col col-lg-3 col-md-6 col-12 q-pa-md" >
        <q-card>
          <q-card-section>
            <div class="text-h6">Quasar Standard</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section class="">
            <q-datetime-picker class="q-mb-md" outlined label="Date using Quasar Standard" v-model="quasar_date" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="Time using Quasar Standard" mode="time" v-model="quasar_time" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="DateTime using Quasar Standard" mode="datetime" v-model="quasar_datetime" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" standout label="DateTime 24h using Quasar Standard" mode="datetime" v-model="quasar_datetime" format24h clearable :rules="rules" icon="date_range"></q-datetime-picker>
          </q-card-section>
          <q-card-actions>
            <q-btn label="Submit" type="submit" dark color="negative" class="full-width" />
          </q-card-actions>
        </q-card>
      </q-form>
      <q-form ref="form6" @submit="onSubmit($refs.form6)" class="col col-lg-3 col-md-6 col-12 q-pa-md" >
        <q-card>
          <q-card-section>
            <div class="text-h6">Quasar Standard - Empty Strings</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section class="">
            <q-datetime-picker class="q-mb-md" outlined default-standard="quasar" label="Date using Quasar Standard" v-model="quasar_empty_date" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined default-standard="quasar" label="Time using Quasar Standard" mode="time" v-model="quasar_empty_time" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined default-standard="quasar" label="DateTime using Quasar Standard" mode="datetime" v-model="quasar_empty_datetime" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" standout default-standard="quasar" label="DateTime 24h using Quasar Standard" mode="datetime" v-model="quasar_empty_datetime" format24h clearable :rules="rules" icon="date_range"></q-datetime-picker>
          </q-card-section>
          <q-card-actions>
            <q-btn label="Submit" type="submit" dark color="negative" class="full-width" />
          </q-card-actions>
        </q-card>
      </q-form>
      <q-form ref="form7" @submit="onSubmit($refs.form7)" class="col col-lg-3 col-md-6 col-12 q-pa-md" >
        <q-card>
          <q-card-section>
            <div class="text-h6">ISO Standard - Empty Strings</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section class="">
            <q-datetime-picker class="q-mb-md" outlined label="Date using Quasar Standard" v-model="iso_empty_date" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="Time using Quasar Standard" mode="time" v-model="iso_empty_time" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="DateTime using Quasar Standard" mode="datetime" v-model="iso_empty_datetime" :rules="rules"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" standout label="DateTime 24h using Quasar Standard" mode="datetime" v-model="iso_empty_datetime" format24h clearable :rules="rules" icon="date_range"></q-datetime-picker>
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
import homeStore from '../store/home'
import languages from 'quasar/lang/index.json'
import { throttle } from 'quasar'
export default {
  name: 'PageIndex',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    store.registerModule('homePage', homeStore)
    return store.dispatch('homePage/init', {
      iso_empty_date: '',
      iso_empty_time: '',
      iso_empty_datetime: '',
      iso_date: '2018-11-02',
      iso_time: '15:46',
      iso_datetime: '2018-11-02T15:46',
      quasar_empty_date: '',
      quasar_empty_time: '',
      quasar_empty_datetime: '',
      quasar_date: '2018/11/02',
      quasar_time: '15:46',
      quasar_datetime: '2018/11/02 15:46',
      language: 'en-US',
      languages
    })
  },
  created () {
    this.$store.registerModule('homePage', homeStore, { preserveState: true })
  },
  destroyed () {
    this.$store.unregisterModule('homePage')
  },
  data () {
    return {
      rules: [
        (val) => !!val || 'Date is required'
      ]
    }
  },
  computed: {
    iso_empty_date: {
      get () { return this.$store.state.homePage.iso_empty_date },
      set (value) { return this.$store.commit('homePage/iso_empty_date', value) }
    },
    iso_empty_time: {
      get () { return this.$store.state.homePage.iso_empty_time },
      set (value) { return this.$store.commit('homePage/iso_empty_time', value) }
    },
    iso_empty_datetime: {
      get () { return this.$store.state.homePage.iso_empty_datetime },
      set (value) { return this.$store.commit('homePage/iso_empty_datetime', value) }
    },
    iso_date: {
      get () { return this.$store.state.homePage.iso_date },
      set (value) { return this.$store.commit('homePage/iso_date', value) }
    },
    iso_time: {
      get () { return this.$store.state.homePage.iso_time },
      set (value) { return this.$store.commit('homePage/iso_time', value) }
    },
    iso_datetime: {
      get () { return this.$store.state.homePage.iso_datetime },
      set (value) { return this.$store.commit('homePage/iso_datetime', value) }
    },
    quasar_empty_date: {
      get () { return this.$store.state.homePage.quasar_empty_date },
      set (value) { return this.$store.commit('homePage/quasar_empty_date', value) }
    },
    quasar_empty_time: {
      get () { return this.$store.state.homePage.quasar_empty_time },
      set (value) { return this.$store.commit('homePage/quasar_empty_time', value) }
    },
    quasar_empty_datetime: {
      get () { return this.$store.state.homePage.quasar_empty_datetime },
      set (value) { return this.$store.commit('homePage/quasar_empty_datetime', value) }
    },
    quasar_date: {
      get () { return this.$store.state.homePage.quasar_date },
      set (value) { return this.$store.commit('homePage/quasar_date', value) }
    },
    quasar_time: {
      get () { return this.$store.state.homePage.quasar_time },
      set (value) { return this.$store.commit('homePage/quasar_time', value) }
    },
    quasar_datetime: {
      get () { return this.$store.state.homePage.quasar_datetime },
      set (value) { return this.$store.commit('homePage/quasar_datetime', value) }
    },
    language: {
      get () { return this.$store.state.homePage.language },
      set (value) { return this.$store.commit('homePage/language', value) }
    },
    languages: {
      get () { return this.$store.state.homePage.languages },
      set (value) { return this.$store.commit('homePage/languages', value) }
    },
    displayValue () {
      return `iso: ${this.iso_datetime} | i18n: ${new Date(this.iso_datetime).toLocaleString(this.language)}`
    }
  },
  watch: {
    iso_date: {
      immediate: true,
      deep: true,
      handler () {
        console.log('iso_date: ', this.iso_date)
      }
    },
    iso_time: {
      immediate: true,
      deep: true,
      handler () {
        console.log('iso_time: ', this.iso_time)
      }
    },
    iso_datetime: {
      immediate: true,
      handler () {
        console.log('iso_datetime: ', this.iso_datetime)
      }
    },
    iso_empty_date: {
      immediate: true,
      deep: true,
      handler () {
        console.log('iso_empty_date: ', this.iso_empty_date)
      }
    },
    iso_empty_time: {
      immediate: true,
      deep: true,
      handler () {
        console.log('iso_empty_time: ', this.iso_empty_time)
      }
    },
    iso_empty_datetime: {
      immediate: true,
      handler () {
        console.log('iso_empty_datetime: ', this.iso_empty_datetime)
      }
    },
    quasar_date: {
      immediate: true,
      deep: true,
      handler () {
        console.log('quasar_date: ', this.quasar_date)
      }
    },
    quasar_time: {
      immediate: true,
      deep: true,
      handler () {
        console.log('quasar_time: ', this.quasar_time)
      }
    },
    quasar_datetime: {
      immediate: true,
      handler () {
        console.log('quasar_datetime: ', this.quasar_datetime)
      }
    },
    quasar_empty_date: {
      immediate: true,
      deep: true,
      handler () {
        console.log('quasar_date: ', this.quasar_empty_date)
      }
    },
    quasar_empty_time: {
      immediate: true,
      deep: true,
      handler () {
        console.log('quasar_time: ', this.quasar_empty_time)
      }
    },
    quasar_empty_datetime: {
      immediate: true,
      handler () {
        console.log('quasar_datetime: ', this.quasar_empty_datetime)
      }
    },
    '$q.lang.isoName': {
      immediate: true,
      handler (value) {
        if (this.language !== value) {
          this.language = value
        }
      }
    }
  },
  filters: {
    displayFilter (value, language) {
      return `iso: ${value} | ${language}: ${new Date(value).toLocaleString(language)}`
    }
  },
  methods: {
    async onLanguageInput () {
      let lang = await import(`quasar/lang/${this.language}`)
      this.$q.lang.set(lang.default)
    },
    dateFilter (date) {
      const parts = date.split('/')
      return parts[2] % 2 === 0
    },
    timeFilter (hr, min, sec) {
      return hr % 2 === 0
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
