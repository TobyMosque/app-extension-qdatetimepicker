import { QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'
import picker from './picker'

export function title ({ self, props, h }) {
  return h(QTabs, {
    class: `bg-${props.color || 'primary'} text-white`,
    props: {
      value: self.tab,
      vertical: props.landscape,
      dense: true
    },
    on: {
      input (value) {
        self.tab = value
      }
    }
  }, [
    h(QTab, {
      props: {
        name: 'date',
        icon: props.dateIcon,
        label: self.isoLang.dateTimePicker.date
      }
    }, []),
    h(QTab, {
      props: {
        name: 'time',
        icon: props.timeIcon,
        label: self.isoLang.dateTimePicker.time
      }
    }, [])
  ])
}

export function content ({ self, props, h }) {
  return h(QTabPanels, {
    props: {
      value: self.tab
    },
    on: {
      input (value) {
        self.tab = value
      }
    }
  }, [
    h(QTabPanel, {
      props: {
        name: 'date'
      }
    }, [picker.date({ self, props, h })]),
    h(QTabPanel, {
      props: {
        name: 'time'
      }
    }, [picker.time({ self, props, h })])
  ])
}

export default function render ({ self, props, h }) {
  if (props.hideTabs) {
    return [that.tabsContent()]
  }
  if (props.landscape) {
    return [
      h('div', {
        class: { 'row': true }
      }, [
        h('div', {
          class: { 'col-auto': true },
          style: { 'min-width': '75px' }
        }, [title({ self, props, h })]),
        h('div', {
          class: { 'col': true }
        }, [content({ self, props, h })])
      ])
    ]
  } else {
    return [
      title({ self, props, h }),
      content({ self, props, h })
    ]
  }
}