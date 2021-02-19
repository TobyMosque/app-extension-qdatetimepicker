import { QIcon } from 'quasar'
import popup from './popup'

export function suffix ({ self, props, h }) {
  return h('h6', {
    class: `text-${props.color || 'primary'} cursor-pointer q-pr-xs`,
    on: {
      click () {
        if (!props.disable && !props.readonly)
        self.toggleSuffix()
      }
    }
  }, self.ampmSuffix)
}

export function clear ({ self, props, h }) {
  return h(QIcon, {
    staticClass: 'cursor-pointer',
    props: { 
      name: props.clearIcon || self.$q.iconSet.field.clear
    },
    on: {
      click (e) {
        e.stopPropagation()
        props.values.input = ''
        self.onInputFilled()
      }
    }
  })
}

export function trigger ({ self, props, h }) {
  let icon = props.mode === 'time' ? props.timeIcon : props.dateIcon;
  let _children = !props.disablePopup ? [popup({ self, props, h })] : []
  return h(QIcon, {
    staticClass: 'cursor-pointer',
    props: {
      name: icon || props.icon
    }
  }, _children)
}

const icons = { suffix, clear, trigger }
export default icons