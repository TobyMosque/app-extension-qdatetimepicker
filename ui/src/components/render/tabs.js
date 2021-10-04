import { h } from 'vue'
import { QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'
import picker from './picker'

export function title (props, renderCtx, vmCtx) {
  const { data } = vmCtx
  return h(QTabs, {
    class: `bg-${props.color || 'primary'} text-white`,
    modelValue: data.tab.value,
    vertical: props.landscape,
    dense: true,
    'onUpdate:modelValue' (value) {
      data.tab.value = value
    }
  }, [
    h(QTab, {
      name: 'date',
      icon: props.dateIcon,
      label: data.isoLang.value.dateTimePicker.date
    }),
    h(QTab, {
      name: 'time',
      icon: props.timeIcon,
      label: data.isoLang.value.dateTimePicker.time
    })
  ])
}

export function content (props, renderCtx, vmCtx) {
  const { data } = vmCtx
  return h(QTabPanels, {
    modelValue: data.tab.value,
    'onUpdate:modelValue' (value) {
      data.tab.value = value
    }
  }, [
    h(QTabPanel, {
      name: 'date'
    }, {
      default (_) {
        return [picker.date(props, renderCtx, vmCtx)]
      }
    }),
    h(QTabPanel, {
      name: 'time'
    }, {
      default (_) {
        return [picker.time(props, renderCtx, vmCtx)]
      }
    })
  ])
}

export default function render (props, renderCtx, vmCtx) {
  if (props.hideTabs) {
    return [content(props, renderCtx, vmCtx)]
  }
  if (props.landscape) {
    return [
      h('div', {
        class: { 'row': true }
      }, [
        h('div', {
          class: { 'col-auto': true },
          style: { 'min-width': '75px' }
        }, {
          default (_) {
            return [title(props, renderCtx, vmCtx)]
          }
        }),
        h('div', {
          class: { 'col': true }
        }, {
          default (_) {
            return [content(props, renderCtx, vmCtx)]
          }
        })
      ])
    ]
  } else {
    return [
      title(props, renderCtx, vmCtx),
      content(props, renderCtx, vmCtx)
    ]
  }
}