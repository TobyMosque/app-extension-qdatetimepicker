<template>
  <doc-card title="Very Basic Example" :html="html" :js="js" :cog="cog"></doc-card>
</template>

<script>
export default {
  name: 'ComponentBasicExample',
  data () {
    return {
      html: `\`\`\`html
<div class="row q-col-gutter-sm">
  <div class="col col-md-4 col-12">
    <q-datetime-picker label="Date Picker" v-model="date" />
  </div>
  <div class="col col-md-4 col-12">
    <q-datetime-picker label="Time Picker" mode="time" v-model="time" />
  </div>
  <div class="col col-md-4 col-12">
    <q-datetime-picker label="Datetime Picker" mode="datetime" v-model="datetime" />
  </div>
</div>
\`\`\``,
      js: `\`\`\`js
export default {
  data () {
    return {
      date: '2010-11-02',
      time: '05:30',
      datetime: '2010-11-02T07:30Z'
    }
  }
}
\`\`\``,
      cog: `\`\`\`js
// optionally you can define that properties globally
import { defaults } from '@toby.mosque/quasar-ui-qdatetimepicker'
\`\`\``
    }
  }
}
</script>
