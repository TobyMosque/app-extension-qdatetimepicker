import {
  QBtn,
  QField,
  QInput,
  QIcon,
  QDate,
  QTime,
  QPopupProxy,
  QCard,
  QCardActions,
  QTabs,
  QTab,
  QTabPanels,
  QTabPanel
} from 'quasar'

const Render = function (self, h) {
  this.h = h
  this.self = self
}
 
Render.prototype.main = function () {
  let that = this
  let { h, self } = that
  let isReadonly = self.target === 'self' || !!self.displayValue
  let isClearable = !!self.values.input && self.clearable
  let component = isReadonly ? QField : QInput

  let children = []
  if (isReadonly) {
    children.push(this.popup())
  }

  let input = this.factory({
    component,
    children,
    cbOptions (options) {
      options.scopedSlots.append = function (props) {
        let icons = []
        if (!self.format24h && self.ampmSuffix && typeof self.displayValue !== 'string') {
          icons.push(that.suffix())
        }
        if (isClearable) {
          icons.push(that.clear())
        }
        if (!isReadonly) {
          icons.push(that.trigger())
        }
        return icons
      }

      if (self.rules) {
        options.props.rules = self.rules.map(rule => {
          return (val) => {
            return rule(self.value)
          }
        })
      }

      if (!isReadonly) {
        options.props.clearable = false
        options.props.mask = self.mask
        options.props.value = self.values.input || ''
        options.on.input = function (value) {
          self.values.input = value
          if (self.values.input.length === self.mask.length || self.values.input.length === 0) {
            self.onInputFilled()
          }
        }
        options.on.blur = function (value) {
          self.onInputBlur()
        }
        options.on.keyup = function (value) {
          switch (true) {
            case self.format24h: return
            case event.keyCode === 65 && self.values.suffix === 'PM':
            case event.keyCode === 80 && self.values.suffix === 'AM': self.toggleSuffix(); break
            case event.shiftKey: return
            case event.keyCode === 38:
            case event.keyCode === 40: self.toggleSuffix()
          }
        }
      } else {
        let text = typeof self.displayValue === 'string' ? self.displayValue : self.values.input
        options.props.stackLabel = !!text
        options.scopedSlots.control = function (props) {
          return h('span', {}, text || '')
        }
      }
    }
  })

  return input
}

Render.prototype.factory = function ({ component, ref, children, cbOptions }) {
  const { value, rules, ...props } = this.self.$props
  const { input, ...listeners } = this.self.$listeners
  const { append, ...scopedSlots } = this.self.$scopedSlots
  const { ...attrs } = this.self.$attrs
  const options = {
    attrs,
    props,
    on: listeners,
    scopedSlots: scopedSlots
  }
  if (ref) {
    options.ref = ref
  }
  if (cbOptions) {
    cbOptions(options)
  }
  return this.h(component, options, children)
}

Render.prototype.clear = function () {
  let { h, self } = this
  return h(QIcon, {
    staticClass: 'cursor-pointer',
    props: { 
      name: self.clearIcon || self.$q.iconSet.field.clear
    },
    on: {
      click: e => {
        e.stopPropagation()
        self.values.input = ''
        self.onInputFilled()
      }
    }
  })
}

Render.prototype.suffix = function () {
  let { h, self } = this
  return h('h6', {
    class: `text-${self.color || 'primary'} cursor-pointer q-pr-xs`,
    on: {
      click (event) {
        self.toggleSuffix()
      }
    }
  }, self.ampmSuffix)

}

Render.prototype.trigger = function () {
  let { h, self } = this
  let trigger = h(QIcon, {
    staticClass: 'cursor-pointer',
    props: {
      name: self.icon || (self.mode === 'time' ? 'access_time' : 'event')
    }
  }, [this.popup()])
  return trigger
}

Render.prototype.popup = function () {
  let that = this
  let { self } = that
  return that.factory({ 
    ref: 'popup', 
    component: QPopupProxy, 
    children: [that.card()],
    cbOptions (options) {
      delete options.props.target
      options.on['before-show'] = self.onPopupShow
      options.on['before-hide'] = self.onPopupHide
      if (self.target === 'self' || !!self.displayValue) {
        options.attrs.fit = true
        options.attrs.cover = true
        options.attrs.anchor = self.anchor === void 0 ? 'top left' : self.anchor
      } else {
        options.attrs.fit = false
        options.attrs.cover = true
      }
    }
  })
}

Render.prototype.card = function () {
  let that = this
  let { h, self } = that
  let children = [ that.content() ]
  if (!self.autoUpdateValue) {
    children.push(h(QCardActions, {
      props: {
        align: 'right',
        dark: self.dark
      }
    }, [
      h(QBtn, {
        props: {
          dark: self.dark,
          flat: true,
          color: 'default'
        },
        on: {
          click () { self.$refs.popup.hide() }
        },
        scopedSlots: {
          default (props) {
            return self.$q.lang.label.cancel || 'Cancel'
          }
        }
      }, []),
      h(QBtn, {
        props: {
          dark: self.dark,
          flat: true,
          color: self.color || 'primary'
        },
        on: {
          click () { self.onSetClick() }
        },
        scopedSlots: {
          default (props) {
            return self.$q.lang.label.set || 'Set'
          }
        }
      }, [])
    ]))
  }
  return that.factory({
    ref: 'card',
    component: QCard,
    children,
    cbOptions (options) {
      options.class = {
        'q-datetimepicker': true,
        'q-datetimepicker-full-width': self.target === 'self' || !!self.displayValue,
        'q-datetimepicker-landscape': self.landscape,
        'q-datetimepicker-portrait': !self.landscape
      }
    }
  })
}

Render.prototype.content = function () {
  let that = this
  let { h, self } = that

  switch (self.mode) {
    case 'date': return that.date()
    case 'time': return that.time()
    default: return that.tabs()
  }
}

Render.prototype.tabs = function () {
  let that = this
  let { h, self } = that
  if (self.hideTabs) {
    return [that.tabsContent()]
  }
  if (self.landscape) {
    return [
      h('div', {
        class: { 'row': true }
      }, [
        h('div', {
          class: { 'col-auto': true },
          style: { 'min-width': '75px' }
        }, [that.tabsTitle()]),
        h('div', {
          class: { 'col': true }
        }, [that.tabsContent()])
      ])
    ]
  } else {
    return [
      that.tabsTitle(),
      that.tabsContent()
    ]
  }
}

Render.prototype.tabsTitle = function () {
  let that = this
  let { h, self } = that

  return h(QTabs, {
    class: `bg-${self.color || 'primary'} text-white`,
    props: {
      value: self.tab,
      vertical: self.landscape,
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
        icon: 'event',
        label: self.isoLang.dateTimePicker.date
      }
    }, []),
    h(QTab, {
      props: {
        name: 'time',
        icon: 'access_time',
        label: self.isoLang.dateTimePicker.time
      }
    }, [])
  ])
}

Render.prototype.tabsContent = function () {
  let that = this
  let { h, self } = that

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
    }, [that.date()]),
    h(QTabPanel, {
      props: {
        name: 'time'
      }
    }, [that.time()])
  ])
}

Render.prototype.date = function () {
  let that = this
  let { h, self } = that

  return that.factory({
    component: QDate,
    cbOptions (options) {
      options.props.options = self.dateOptions
      options.props.mask = self.dateMask
      options.props.value = self.values.date
      options.on.input = function (value) {
        self.values.date = value
        if (self.autoUpdateValue) {
          self.onSetClick()
        }
      }
    }
  })
}

Render.prototype.time = function () {
  let that = this
  let { h, self } = that

  return that.factory({
    component: QTime,
    cbOptions (options) {
      options.props.options = self.timeOptions
      options.props.mask = self.timeMask
      options.props.value = self.values.time
      options.on.input = function (value) {
        self.values.time = value
        if (self.autoUpdateValue) {
          self.onSetClick()
        }
      }
    }
  })
}

export default Render
