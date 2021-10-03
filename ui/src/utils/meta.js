let getNextIndex = ({ meta, formatted, index }) => {
  let next = [meta.day, meta.month, meta.year].filter(part => part.pos > index).sort((partA, partB) => partA.pos - partB.pos)[0]
  if (next) {
    return next.pos
  } else {
    return formatted.length
  }
}

export function time ({ language, options }) {
  let meta = {}
  let mask = ''
  let formatter = new Intl.DateTimeFormat(language, options)
  let date = new Date(2011, 11, 11, 11, 22, 44)
  let formatted = formatter.format(date)
  meta.separator = ''
  meta.hour = {
    pos: formatted.indexOf('11'),
    cases: 2,
    order: -1
  }
  meta.minute = {
    pos: formatted.indexOf('22'),
    cases: 2,
    order: -1
  }
  meta.second = {
    pos: formatted.indexOf('44'),
    cases: 2,
    order: -1
  }
  let limit = [ meta.hour, meta.minute, meta.second ].filter(meta => meta.pos !== -1).length

  let _index = 0
  for (let i = 0; i < limit; i++) {
    if (meta.hour.pos === _index) {
      meta.hour.order = i
      mask = mask + ''.padStart(meta.hour.cases, '#')
      if (i < limit - 1) {
        _index += meta.hour.cases
        meta.separator = formatted.substring(_index, ++_index)
        mask = mask + meta.separator
      }
    } else if (meta.minute.pos === _index) {
      meta.minute.order = i
      mask = mask + ''.padStart(meta.minute.cases, '#')
      if (i < limit - 1) {
        _index += meta.minute.cases
        meta.separator = formatted.substring(_index, ++_index)
        mask = mask + meta.separator
      }
      continue
    } else if (meta.second.pos === _index) {
      meta.second.order = i
      mask = mask + ''.padStart(meta.second.cases, '#')
      if (i < limit - 1) {
        _index += meta.ysecondear.cases
        meta.separator = formatted.substring(_index, ++_index)
        mask = mask + meta.separator
      }
    }
  }
  return { meta, mask }
}

export function date ({ language, options }) {
  let meta = {}
  let mask = ''
  let formatter = new Intl.DateTimeFormat(language, options)
  let date = new Date(2048, 11, 24)
  let formatted = formatter.format(date)
  let yearCases = formatted.indexOf('2048') !== -1 ? 4 : 2
  meta.separator = ''
  meta.year = {
    pos: yearCases === 4 ? formatted.indexOf('2048') : formatted.indexOf('48'),
    cases: yearCases,
    order: -1
  }
  meta.month = {
    pos: formatted.indexOf('12'),
    cases: 2,
    order: -1
  }
  meta.day = {
    pos: formatted.indexOf('24'),
    cases: 2,
    order: -1
  }
  let limit = [ meta.year, meta.month, meta.day ].filter(meta => meta.pos !== -1).length
  
  let _index = 0
  for (let i = 0; i < limit; i++) {
    if (meta.day.pos === _index) {
      meta.day.order = i
      mask = mask + ''.padStart(meta.day.cases, '#')
      if (i < limit - 1) {
        _index += meta.day.cases
        let nextIndex = getNextIndex({ meta, formatted, index: _index })
        meta.separator = formatted.substring(_index, nextIndex)
        _index = nextIndex
        mask = mask + meta.separator
      }
    } else if (meta.month.pos === _index) {
      meta.month.order = i
      mask = mask + ''.padStart(meta.month.cases, '#')
      if (i < limit - 1) {
        _index += meta.month.cases
        let nextIndex = getNextIndex({ meta, formatted, index: _index })
        meta.separator = formatted.substring(_index, nextIndex)
        _index = nextIndex
        mask = mask + meta.separator
      }
      continue
    } else if (meta.year.pos === _index) {
      meta.year.order = i
      mask = mask + ''.padStart(meta.year.cases, '#')
      if (i < limit - 1) {
        _index += meta.year.cases
        let nextIndex = getNextIndex({ meta, formatted, index: _index })
        meta.separator = formatted.substring(_index, nextIndex)
        _index = nextIndex
        mask = mask + meta.separator
      }
    }
  }
  return { meta, mask }
}

export function ampm ({ language, options }) {
  let ampm = { am: 'AM', pm: 'PM', suffix: true }
  let formatter = new Intl.DateTimeFormat(language, { ...options, hour12: true })
  let formatter24 = new Intl.DateTimeFormat(language, { ...options, hour12: false })
  let dateAM = new Date(2011, 11, 11, 11, 22, 44)
  let datePM = new Date(2011, 11, 11, 23, 22, 44)
  let formatted24 = formatter24.format(dateAM)
  let formattedAM = formatter.format(dateAM)
  let formattedPM = formatter.format(datePM)
  ampm.am = formattedAM.replace(formatted24, '').trim()
  ampm.pm = formattedPM.replace(formatted24, '').trim()
  ampm.suffix = formattedAM.endsWith(ampm.am)
  return ampm
}

export default { time, date, ampm }
