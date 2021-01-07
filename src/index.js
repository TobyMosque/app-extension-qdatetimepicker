/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const extendDatetimePicker = function (conf) {
  if (conf.ctx.mode.ssr) {
    conf.boot.unshift({ path: '~quasar-app-extension-qdatetimepicker/src/boot/qdatetimepicker.ssr-client.js', server: false })
    conf.boot.unshift({ path: '~quasar-app-extension-qdatetimepicker/src/boot/qdatetimepicker.ssr-server.js', client: false })
  }
  conf.boot.unshift('~quasar-app-extension-qdatetimepicker/src/boot/qdatetimepicker.js')
  conf.build.transpileDependencies.push(/quasar-app-extension-qdatetimepicker[\\/]src/)
  if (conf.css.some(style => style.endsWith('.styl'))) {
    conf.css.push('~quasar-app-extension-qdatetimepicker/src/component/datetime-picker.styl')
  } else {
    conf.css.push('~quasar-app-extension-qdatetimepicker/src/component/datetime-picker.sass')
  }
}

module.exports = function (api) {
  api.compatibleWith('quasar', '^1.0.0')
  api.compatibleWith('@quasar/app', '^1.3.0 || ^2.0.0')

  api.registerDescribeApi('QDatetimePicker', './component/QDatetimePicker.json')
  api.extendQuasarConf(extendDatetimePicker)
}
