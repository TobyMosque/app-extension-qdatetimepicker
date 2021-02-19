import { options as optionsFn } from './_factory'
import { QCard, QCardActions, QBtn } from 'quasar'
import picker from './picker'
import tabs from './tabs'

export function content ({ self, props, h }) {
  switch (self.mode) {
    case 'date': return picker.date({ self, props, h })
    case 'time': return picker.time({ self, props, h })
    default: return tabs({ self, props, h })
  }
}

export default function render ({ self, props, h }) {
  let children = [ content({ self, props, h }) ]
  if (!props.autoUpdateValue) {
    children.push(h(QCardActions, {
      props: {
        align: 'right',
        dark: props.dark
      }
    }, [
      h(QBtn, {
        props: {
          dark: props.dark,
          flat: true,
          color: 'default'
        },
        on: {
          click () { self.$refs.popup.hide() }
        },
        scopedSlots: {
          default () {
            return self.$q.lang.label.cancel || 'Cancel'
          }
        }
      }, []),
      h(QBtn, {
        props: {
          dark: props.dark,
          flat: true,
          color: props.color || 'primary'
        },
        on: {
          click () { self.onSetClick() }
        },
        scopedSlots: {
          default () {
            return self.$q.lang.label.set || 'Set'
          }
        }
      }, [])
    ]))
  }

  const options = optionsFn({ self, ref: 'card' })
  options.class = {
    'q-datetimepicker': true,
    'q-datetimepicker-full-width': props.target === 'self' || !!props.displayValue,
    'q-datetimepicker-landscape': props.landscape,
    'q-datetimepicker-portrait': !props.landscape
  }
  return h(QCard, options, children)
}