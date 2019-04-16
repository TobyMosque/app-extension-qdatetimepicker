module.exports = function (api) {
  var compatibleWith = api.compatibleWith || function (package, version) {
    return api.compatibleWithQuasarApp(version)
  }
  compatibleWith('@quasar/app', '^1.0.0-beta.17')
}
