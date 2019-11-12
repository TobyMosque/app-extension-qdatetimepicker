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
      <div class="full-width q-mb-md">
        <q-card>
          <q-card-section class="full-width bg-grey-2">
            <div class="text-h4 text-center">Default</div>
            <div class="text-subtitle1 text-center">Light Theme</div>
          </q-card-section>
          <div class="row full-width">
            <my-inputs v-model="iso.date"></my-inputs>
            <my-inputs mode="time" v-model="iso.time"></my-inputs>
            <my-inputs mode="datetime" v-model="iso.datetime"></my-inputs>
          </div>
        </q-card>
      </div>

      <div class="full-width q-mb-md">
        <q-card>
          <q-card-section class="full-width bg-grey-9 text-white">
            <div class="text-h4 text-center">Default</div>
            <div class="text-subtitle1 text-center">Dark Theme</div>
          </q-card-section>
          <div class="row full-width">
            <my-inputs dark v-model="iso.date"></my-inputs>
            <my-inputs dark mode="time" v-model="iso.time"></my-inputs>
            <my-inputs dark mode="datetime" v-model="iso.datetime"></my-inputs>
          </div>
        </q-card>
      </div>

      <div class="full-width q-mb-md">
        <q-card>
          <q-card-section class="full-width bg-grey-2">
            <div class="text-h4 text-center">Custom Format</div>
          </q-card-section>
          <div class="row full-width">
            <my-inputs color="negative" :display-value="displayDate" v-model="iso.date"></my-inputs>
            <my-inputs color="negative" :display-value="displayTime" mode="time" v-model="iso.time"></my-inputs>
            <my-inputs color="negative" :display-value="displayDatetime" mode="datetime" v-model="iso.datetime"></my-inputs>
          </div>
        </q-card>
      </div>

      <div class="full-width q-mb-md">
        <q-card>
          <q-card-section class="full-width bg-grey-9 text-white">
            <div class="text-h4 text-center">Format 24h</div>
          </q-card-section>
          <div class="row full-width">
            <my-inputs color="negative" dark :format24h="format24h" v-model="iso.date"></my-inputs>
            <my-inputs color="negative" dark :format24h="format24h" mode="time" v-model="iso.time"></my-inputs>
            <my-inputs color="negative" dark :format24h="format24h" mode="datetime" v-model="iso.datetime"></my-inputs>
          </div>
        </q-card>
      </div>

      <div class="full-width q-mb-md">
        <q-card>
          <q-card-section class="full-width bg-grey-2">
            <div class="text-h4 text-center">Value Format</div>
            <div class="text-subtitle1 text-center">yyyy/MM/dd HH:mm:ss</div>
          </q-card-section>
          <div class="row full-width">
            <my-inputs color="positive" v-model="quasar.date"></my-inputs>
            <my-inputs color="positive" mode="time" standard="quasar" v-model="quasar.time"></my-inputs>
            <my-inputs color="positive" mode="datetime" v-model="quasar.datetime"></my-inputs>
          </div>
        </q-card>
      </div>

      <div class="full-width q-mb-md">
        <q-card>
          <q-card-section class="full-width bg-grey-9 text-white">
            <div class="text-h4 text-center">Validation & Options</div>
            <div class="text-subtitle1 text-center">Rules, Data Options, Time Options</div>
          </q-card-section>
          <div class="row full-width">
            <my-inputs dark color="positive" :rules="rules" v-model="quasar.date" :date-options="dateOptions"></my-inputs>
            <my-inputs dark color="positive" :rules="rules" mode="time" standard="quasar" v-model="quasar.time" :time-options="timeOptions"></my-inputs>
            <my-inputs dark color="positive" :rules="rules" mode="datetime" v-model="quasar.datetime" :date-options="dateOptions" :time-options="timeOptions"></my-inputs>
          </div>
        </q-card>
      </div>

      <div class="full-width q-mb-md">
        <q-card>
          <q-card-section class="full-width bg-grey-2">
            <div class="text-h4 text-center">Shared Value</div>
            <div class="text-subtitle1 text-center">value shared between date, time and datetime</div>
          </q-card-section>
          <div class="row full-width">
            <my-inputs v-model="iso.datetime"></my-inputs>
            <my-inputs mode="time" v-model="iso.datetime"></my-inputs>
            <my-inputs mode="datetime" v-model="iso.datetime"></my-inputs>
          </div>
        </q-card>
      </div>

      <div class="col col-md-6 col-12 q-pa-md">
        <q-banner rounded class="bg-primary text-white">
          <template v-slot:avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
            </q-avatar>
          </template>
          New to Quasar? Don't miss the chance to know the best Framework based on Vue
          <template v-slot:action>
            <a href="https://quasar.dev">
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
import Inputs from 'src/components/Inputs'
export default {
  name: 'PageIndex',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    store.registerModule('homePage', homeStore)
    return store.dispatch('homePage/init', {
      language: 'en-US',
      languages
    })
  },
  components: {
    'my-inputs': Inputs
  },
  created () {
    this.$store.registerModule('homePage', homeStore, { preserveState: true })
  },
  destroyed () {
    this.$store.unregisterModule('homePage')
  },
  data () {
    return {
      format24h: true,
      iso: {
        date: '2018-11-02',
        time: '15:46',
        datetime: '2018-11-02T15:46'
      },
      quasar: {
        date: '2018/11/02',
        time: '15:46',
        datetime: '2018/11/02 15:46'
      },
      rules: [
        (val) => !!val || 'Date is required'
      ]
    }
  },
  watch: {
    iso: {
      deep: true,
      handler () {
        console.log(this.iso)
      }
    },
    quasar: {
      deep: true,
      handler () {
        console.log(this.quasar)
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
  computed: {
    displayDate () {
      return 'iso: ' + this.iso.date
    },
    displayTime () {
      return 'iso: ' + this.iso.time
    },
    displayDatetime () {
      return 'iso: ' + this.iso.datetime
    },
    language: {
      get () { return this.$store.state.homePage.language },
      set (value) { return this.$store.commit('homePage/language', value) }
    },
    languages: {
      get () { return this.$store.state.homePage.languages },
      set (value) { return this.$store.commit('homePage/languages', value) }
    }
  },
  methods: {
    async onLanguageInput () {
      let lang = await import('quasar/lang/' + this.language)
      this.$q.lang.set(lang.default)
    },
    dateOptions (date) {
      const parts = date.split('/')
      return parts[2] % 2 === 0
    },
    timeOptions (hr, min, sec) {
      return hr % 2 === 0
    }
  }
}
</script>
