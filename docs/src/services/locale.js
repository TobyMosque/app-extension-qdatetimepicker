const locales = ['en-us', 'pt-br']
const regions = {
  en: 'en-us',
  pt: 'pt-br'
}
const fallback = regions.en
const detectLocale = function () {
  if (process.env.CLIENT) {
    const locale = navigator.language.toLowerCase()
    if (locales.includes(locale)) {
      return locale
    }
    const region = locale.split('-')[0]
    if (region in regions) {
      return regions[region]
    }
    return regions.en
  } else {
    return fallback
  }
}

export {
  locales,
  regions,
  fallback,
  detectLocale
}
