import { boot } from 'quasar/wrappers'
import VuePlugin from '@toby.mosque/quasar-ui-qdatetimepicker'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
