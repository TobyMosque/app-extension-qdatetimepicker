export default function loadLang (lang) {
  let langList = {}
  if (lang) {
    // detect if UMD version is installed
    if (process.env.CLIENT && window && window.QDatetimePicker && window.QDatetimePicker.Component) {
      const name = lang.replace(/-([a-z])/g, g => g[1].toUpperCase())
      if (window.QDatetimePicker.lang && window.QDatetimePicker.lang[name]) {
        const selectedLang = window.QDatetimePicker.lang[name]
        langList = selectedLang
      }
      else {
        /* eslint-disable-next-line no-console */
        console.error(`QDatetimePicker: no language loaded called '${lang}'`)
        /* eslint-disable-next-line no-console */
        console.error('Be sure to load the UMD version of the language in a script tag before using with UMD')
      }
    } else {
      try {
        const langSet = require(`@toby.mosque/quasar-ui-qdatetimepicker/src/lang/${lang}.js`)
        langList = langSet.default || langSet
      } catch (e) {
        try {
          const langSet = require(`../lang/${lang}.js`)
          langList = langSet.default || langSet
        } catch (e) {
          /* eslint-disable-next-line no-console */
          console.error(`QDatetimePicker: cannot find language file called '${lang}'`)
        }
      } 
    }
  }
  return langList
}
