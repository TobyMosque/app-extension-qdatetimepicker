import { defaults } from '@toby.mosque/quasar-ui-qdatetimepicker'
import Vue from 'vue'

Vue.component('doc-card', () => import('src/components/DocCard.vue'))
Vue.component('basic-example', () => import('src/components/BasicExample.vue'))
Vue.component('lang-example', () => import('src/components/LangExample.vue'))
Vue.component('qdtp-theme-selector', () => import('src/components/ThemeSelector.vue'))

defaults.light.outlined = true
defaults.dark.filled = true
