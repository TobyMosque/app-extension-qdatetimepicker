/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const extendDatetimePicker = function (conf) {
  conf.boot = conf.boot || []
  conf.css = conf.css || []

  const bootFile = '~quasar-app-extension-datetimepicker/boot/qdatetimepicker.js'
  const cssFile = '~quasar-app-extension-datetimepicker/component/datetime-picker.styl'
  
  if (!conf.boot.includes(bootFile)) {
    conf.boot.push(bootFile)
    conf.build.transpileDependencies.push(/quasar-app-extension-datetimepicker[\\/]src[\\/]boot/)
  }
  
  if (!conf.css.includes(cssFile)) {
    conf.css.push(cssFile)
  }
}

module.exports = function (api, conf) {
  api.registerDescribeApi('QDatetimePicker', '../component/QDatetimePicker.json')
  api.extendQuasarConf(extendDatetimePicker)
}
