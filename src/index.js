/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const extendDatetimePicker = function (conf) {
  conf.boot.push('~quasar-app-extension-qdatetimepicker/src/boot/qdatetimepicker.js')
  conf.build.transpileDependencies.push(/quasar-app-extension-qdatetimepicker[\\/]src/)
  conf.css.push('~quasar-app-extension-qdatetimepicker/src/component/datetime-picker.styl')
}

module.exports = function (api) {
  var compatibleWith = api.compatibleWith || function (_, version) {
    return api.compatibleWithQuasarApp(version)
  }
  compatibleWith('@quasar/app', '^1.0.0-beta.22')

  api.registerDescribeApi('QDatetimePicker', './component/QDatetimePicker.json')
  api.extendQuasarConf(extendDatetimePicker)
}
