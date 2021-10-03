import { ref } from 'vue'

export default function useComputed() {
  const popup = ref(null)
  const time = ref(null)
  const input = ref(null)
  const dialog = ref(null)
  const menu = ref(null)

  return {
    popup,
    time,
    input,
    dialog,
    menu
  }
}