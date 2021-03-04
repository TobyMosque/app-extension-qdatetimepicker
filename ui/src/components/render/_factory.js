export function options ({ self, ref }) {
  const { value, rules, ...props } = self.__properties
  const { input, ...listeners } = self.$listeners
  const { append, ...scopedSlots } = self.$scopedSlots
  const { ...attrs } = self.$attrs
  const options = {
    ref: undefined,
    attrs,
    props,
    on: listeners,
    scopedSlots: scopedSlots
  }
  if (ref) {
    options.ref = ref
  }
  return options
}