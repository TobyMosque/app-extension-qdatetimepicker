/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const extendDatetimePicker = function (conf, ctx) {
  conf.boot = conf.boot || []
  conf.css = conf.css || []

  const bootFile = '~quasar-app-extension-qdatetimepicker/boot/qdatetimepicker.js'
  const cssFile = '~quasar-app-extension-qdatetimepicker/component/datetime-picker.styl'
  
  if (!conf.boot.includes(bootFile)) {
    conf.boot.push(bootFile)
    conf.build.transpileDependencies.push(/quasar-app-extension-qdatetimepicker\/[boot|component]/)
  }
  
  if (!conf.css.includes(cssFile)) {
    conf.css.push(cssFile)
  }
}

module.exports = function (api, conf) {
  api.registerDescribeApi('QDatetimePicker', '../component/QDatetimePicker.json')
  api.extendQuasarConf(extendDatetimePicker)
}
