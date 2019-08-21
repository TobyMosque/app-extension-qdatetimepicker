export function parse ({ proporsal, withSeconds }) {
  let padStart = (number, length = 2) => {
    return ('' + number).padStart(length, '0')
  }
  let objDate = new Date(proporsal)
  let isValid = !isNaN(objDate.getTime())
  if (isValid) {
    let year = padStart(objDate.getFullYear(), 4)
    let month = padStart(objDate.getMonth() + 1)
    let day = padStart(objDate.getDate())
    let hour = padStart(objDate.getHours())
    let minute = padStart(objDate.getMinutes())
    let formatted = `${year}/${month}/${day} ${hour}:${minute}`
    if (withSeconds) {
      let second = padStart(objDate.getSeconds())
      formatted = formatted + `:${second}`
    }
    let quasar = formatted
    let iso = quasar.replace(/[/]/g, '-').replace(' ', 'T')
    return { success: true, quasar, iso }
  }
  return { success: false, quasar: '', iso: '' }
}

export function getDefault ({ base, mode }) {
  let meta, quasar, baseDate
  if (mode === 'time') {
    baseDate = new Date(base || '1970-01-01')
  } else {
    if (base) {
      baseDate = new Date(base)
    } else {
      baseDate = new Date()
    }
  }
  meta = {
    year: ('' + baseDate.getFullYear()).padStart(4, '0'),
    month: ('' + (baseDate.getMonth() + 1)).padStart(2, '0'),
    day: ('' + baseDate.getDate()).padStart(2, '0'),
  }
  quasar = `${meta.year}/${meta.month}/${meta.day}`
  return {
    meta,
    quasar
  }
}

export function quasar ({ base, masked, ampm, mode, metas, masks }) {
  let today = getDefault({ base, mode })
  let date = today.quasar
  let time = '00:00:00'
  if (base) {
    const baseDate = new Date(base)
    let hour = (baseDate.getHours() + '').padStart(2, '0')
    let minute = (baseDate.getMinutes() + '').padStart(2, '0')
    let second = (baseDate.getSeconds() + '').padStart(2, '0')
    time = `${hour}:${minute}:${second}`
  }
  let maskedDate, maskedTime
  switch (mode) {
    case 'date':
      maskedDate = masked
      break
    case 'time':
      maskedTime = masked
      break
    default:
      maskedDate = masked.substring(0, masks.date.length)
      maskedTime = masked.substring(masks.date.length + 1)
      break
  }
  if (maskedDate) {
    let meta = metas.date
    let parts = maskedDate.split(meta.separator)
    let year = meta.year.order === -1 ? today.meta.years : parts[meta.year.order]
    let month = meta.month.order === -1 ? today.meta.month : parts[meta.month.order]
    let day = meta.day.order === -1 ? today.meta.day : parts[meta.day.order]
    date = `${year}/${month}/${day}`
  }
  if (maskedTime) {
    let meta = metas.time
    let parts = maskedTime.split(meta.separator)
    let hour = meta.hour.order === -1 ? '00' : parts[meta.hour.order].padStart(2, '0')
    let minute = meta.minute.order === -1 ? '00' : parts[meta.minute.order].padStart(2, '0')
    let second = meta.second.order === -1 ? '00' : parts[meta.second.order].padStart(2, '0')
    if (ampm) {
      let hours = parseInt(hour)
      let minutes = parseInt(minute)
      if (hours === 12 && minutes === 0) {
        ampm = ampm === 'PM' ? 'AM' : 'PM'
      } else if (hours >= 12) {
        hours -= 12
        ampm = 'PM'
      }
      if (ampm === 'PM') {
        hours += 12
      }
      if (hours === 24) {
        hours = 0
      }
      hour = ('' + hours).padStart(2, '0')
    }
    time = `${hour}:${minute}:${second}`
  }
  return `${date} ${time}`
}

export function masked ({ values, metas, masks }) {
  let date, time, time12, ampm, meta, parts, parts12, array, array12, metaList
  if (masks.date) {
    date = values.date
    meta = metas.date
    parts = date.split('/')
    array = []
    metaList = [meta.year, meta.month, meta.day].map((meta, index) => ({ meta, index }))
    for (let pos = 0; pos < 3; pos++) {
      let metaItem = metaList.find(item => item.meta.order === pos)
      if (metaItem && metaItem.index !== -1) {
        let value = parts[metaItem.index]
        if (value) {
          array.push(parts[metaItem.index])
        }
      }
    }
    date = array.join(meta.separator)
  }
  if (masks.time) {
    meta = metas.time

    time = values.time
    time12 = values.time    
    parts = time.split(':')
    parts12 = time12.split(':')
    array = []
    array12 = []

    let hours = parseInt(parts12[0])
    let minutes = parseInt(parts12[1])
    ampm = hours >= 12 ? 'PM' : 'AM'
    if (ampm === 'PM') {
      hours -= 12
    }
    if (hours === 0 && minutes === 0) {
      hours += 12
    }
    parts12[0] = ('' + hours).padStart(2, '0')

    metaList = [meta.hour, meta.minute, meta.second].map((meta, index) => ({ meta, index }))
    for (let pos = 0; pos < 3; pos++) {
      let metaItem = metaList.find(item => item.meta.order === pos)
      if (metaItem && metaItem.index !== -1) {
        let value = parts[metaItem.index]
        if (value) {
          array.push(parts[metaItem.index])
          array12.push(parts12[metaItem.index])
        }
      }
    }
    time = array.join(meta.separator)
    time12 = array12.join(meta.separator)
  }
  if (masks.date && masks.time) {
    return {
      format12: `${date} ${time12}`,
      format24: `${date} ${time}`,
      ampm
    }
  } else if (masks.date) {
    return { format12: date, format24: date, ampm }
  } else {
    return { format12: time12, format24: time, ampm }
  }
}
