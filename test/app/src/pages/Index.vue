<template>
  <q-page class="flex flex-center">
    <div class="full-width row q-pa-md">
      <div class="col col-12 q-mb-md">
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
      <div class="col col-4 q-pa-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">Input Types</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-datetime-picker class="q-mb-md" label="Standard Date Picker" v-model="date"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="Outlined Date Picker" v-model="date"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" filled label="Filled Date Picker" v-model="date"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" standout label="Standout Date Picker" v-model="date"></q-datetime-picker>
          </q-card-section>
        </q-card>
      </div>
      <div class="col col-4 q-pa-md">
        <q-card dark class="bg-grey-10">
          <q-card-section>
            <div class="text-h6">Dark Mode</div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section class="">
            <q-datetime-picker class="q-mb-md" outlined label="Date Picker" color="negative" dark v-model="date"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="Time Picker" :time="true" color="negative" dark v-model="time"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="DateTime Picker" :date="true" :time="true" color="negative" dark v-model="datetime"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" standout label="Standout DateTime Picker" :date="true" :time="true" color="negative" dark v-model="datetime"></q-datetime-picker>
          </q-card-section>
        </q-card>
      </div>
      <div class="col col-4 q-pa-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">Light Mode</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-datetime-picker class="q-mb-md" outlined label="Date Picker" color="positive" v-model="date"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="Time Picker" :time="true" color="positive" v-model="time"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" outlined label="DateTime Picker" :date="true" :time="true" color="positive" v-model="datetime"></q-datetime-picker>
            <q-datetime-picker class="q-mb-md" standout label="Standout DateTime Picker" :date="true" :time="true" color="positive" v-model="datetime"></q-datetime-picker>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
// import something here
import languages from 'quasar/lang/index.json'
export default {
  name: 'PageIndex',
  data () {
    return {
      date: '2018-11-02',
      time: '15:46',
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
  methods: {
    async onLanguageInput () {
      let lang = await import(`quasar/lang/${this.language}`)
      this.$q.lang.set(lang.default)
    }
  }
}
</script>
