<template>
  <doc-card title="Custom Language" :description="description" has-form :lang="lang" :html="html" :js="js" :cog="cog">
    <template v-slot:form="">
      <q-select
        v-model="lang" :options="languages"
        label="Language" map-options emit-value option-value="isoName" option-label="nativeName"
        :filled="$q.dark.isActive" :outlined="!$q.dark.isActive">
      </q-select>
    </template>
  </doc-card>
</template>

<script>
import languages from 'quasar/lang/index.json'

export default {
  name: 'ComponentLangExample',
  data () {
    return {
      lang: 'en-us',
      languages,
      description: `By default, the date and/or the time will be formated using the same locale as defined in the app.
Whatever, you can define your own locale per component instance through the property \`lang\`.
`,
      html: `\`\`\`html
<div class="row q-col-gutter-sm">
  <div class="col col-12">
    <q-select v-model="lang" :options="languages" :label="Language" map-options emit-value option-value="isoName" option-label="nativeName"></q-select>
  </div>
  <div class="col col-md-4 col-12">
    <q-datetime-picker :lang="lang" label="Date Picker" v-model="date" />
  </div>
  <div class="col col-md-4 col-12">
    <q-datetime-picker :lang="lang" label="Time Picker" mode="time" v-model="time" />
  </div>
  <div class="col col-md-4 col-12">
    <q-datetime-picker :lang="lang" label="Datetime Picker" mode="datetime" v-model="datetime" />
  </div>
</div>
\`\`\``,
      js: `\`\`\`js
import languages from 'quasar/lang/index.json'
export default {
  data () {
    return {
      lang: 'en-us',
      languages,
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

defaults.light.lang = 'en-us'
defaults.dark.lang = 'en-us'
\`\`\``
    }
  }
}
</script>
