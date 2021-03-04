<template>
  <q-card class="bg-content full-width q-mb-md">
    <q-card-section class="text-center">
      <span class="text-h5"> {{title}} </span>
    </q-card-section>
    <q-separator/>
    <template v-if="description">
      <q-card-section style="white-space: pre-line">
        <q-markdown class="bg-content" :src="description"></q-markdown>
      </q-card-section>
      <q-separator/>
    </template>
    <q-card-section class="row q-col-gutter-sm">
      <div v-if="hasForm" class="col col-12">
        <slot name="form"/>
      </div>
      <div class="col col-md-4 col-12">
        <q-datetime-picker label="Date Picker" :default-standard="standard" v-bind="$attrs" v-on="$listeners" v-model="date">
          <slot v-for="(slot, key) in $slots" :name="key" :slot="key" />
          <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
            <slot :name="key" v-bind="scope"/>
          </template>
        </q-datetime-picker>
      </div>
      <div class="col col-md-4 col-12">
        <q-datetime-picker label="Time Picker" :default-standard="standard" v-bind="$attrs" v-on="$listeners" mode="time" v-model="time">
          <slot v-for="(slot, key) in $slots" :name="key" :slot="key" />
          <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
            <slot :name="key" v-bind="scope"/>
          </template>
        </q-datetime-picker>
      </div>
      <div class="col col-md-4 col-12">
        <q-datetime-picker label="Datetime Picker" :default-standard="standard" v-bind="$attrs" v-on="$listeners" mode="datetime" v-model="datetime">
          <slot v-for="(slot, key) in $slots" :name="key" :slot="key" />
          <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
            <slot :name="key" v-bind="scope"/>
          </template>
        </q-datetime-picker>
      </div>
    </q-card-section>
    <q-card-section>
      <q-tabs v-model="tab" color="content-2" align="right">
        <q-tab name="html5" icon="mdi-language-html5"></q-tab>
        <q-tab name="js" icon="mdi-language-javascript"></q-tab>
        <q-tab name="cog" icon="mdi-cog"></q-tab>
      </q-tabs>
      <q-tab-panels class="bg-main" v-model="tab" animated>
        <q-tab-panel name="html5">
          <q-markdown class="bg-content-2" :src="html"></q-markdown>
        </q-tab-panel>
        <q-tab-panel name="js">
          <q-markdown class="bg-content-2" :src="js"></q-markdown>
        </q-tab-panel>
        <q-tab-panel name="cog">
          <q-markdown class="bg-content-2" :src="cog"></q-markdown>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'ComponentDocCard',
  props: {
    title: String,
    description: String,
    'has-form': {
      type: Boolean,
      default: false
    },
    standard: {
      type: String,
      default: 'iso'
    },
    html: String,
    js: String,
    cog: String
  },
  data () {
    return {
      tab: 'html5',
      date: this.standard === 'quasar' ? '2010/11/02' : '2010-11-02',
      time: this.standard === 'quasar' ? '05:30' : '07:30',
      datetime: this.standard === 'quasar' ? '2010/11/02 05:30' : '2010-11-02T07:30'
    }
  }
}
</script>
