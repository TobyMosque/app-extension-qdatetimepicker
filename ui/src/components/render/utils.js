export function optionsFn (renderCtx, vmCtx) {
  const { attrs, slots } = renderCtx
  const { ref, computed } = vmCtx
  const { value, rules, ...curProps } = computed.__properties.value
  const { append, ...curSlots } = slots
  const _slots = Object.assign({}, curSlots)
  const _props = Object.assign({}, attrs, curProps)
  
  const options = {
    props: _props,
    slots: _slots
  }
  if (ref) {
    options.props.ref = ref
  }
  return options
}