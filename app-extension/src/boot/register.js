import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-qdatetimepicker'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
