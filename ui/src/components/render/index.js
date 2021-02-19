import input from './input'
import data from '../options/data'
import { keys } from '../options/props'

export default function render (h) {
  const self = this
  const props = {}
  for (const key of Object.keys(data())) {
    Object.defineProperty(props, key, {
      get () { return self[key] },
      set (value) { return self[key] = value }
    })
  }
  for (const key of keys) {
    Object.defineProperty(props, key, {
      get () { return self.__properties[key] }
    })
  }
  return input({ self: this, props: props, h })
}