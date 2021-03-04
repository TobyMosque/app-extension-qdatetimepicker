export function getType(instance) {
  const type = Object.prototype.toString.call(instance).split(' ')[1]
  return type.substr(0, type.length - 1).toLowerCase()
}
