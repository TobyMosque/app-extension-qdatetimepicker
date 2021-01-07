export default async function ({ app }) {
  if (window.__QDTP_DEFAULTS__) {
    const _defaults = window.__QDTP_DEFAULTS__
    for (const key in _defaults.icons) {
      app.qdtp.icons = _defaults.icons[key]
    }
  }
}
