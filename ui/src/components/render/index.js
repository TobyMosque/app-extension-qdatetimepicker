import input from './input'
import data from '../options/data'
import { keys } from '../options/props'

export default function render (h) {
  const self = this
  const props = {}
  const dataKeys = Object.keys(data())
  for (const i in dataKeys) {
    const key = dataKeys[i]
    Object.defineProperty(props, key, {
      get () { return self[key] },
      set (value) { return self[key] = value }
    })
  }
  for (const i in keys) {
    const key = keys[i]
    Object.defineProperty(props, key, {
      get () { return self.__properties[key] }
    })
  }
  return input({ self: this, props: props, h })
}