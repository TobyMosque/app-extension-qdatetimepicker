QDatetimePicker (quasar-app-extension-qdatetimepicker)
===

QDatetimePicker is an `UI App Extension` for [Quasar Framework v1](https://v1.quasar-framework.org/). It will not work with legacy versions of Quasar Framework.

This work is currently in `alpha` and there are expected changes while things get worked out. Your help with testing is greatly appreciated.

# Notes
`v1.0.0-alpha.21` - SSR hydration - don't forget to tun `quasar upgrade` (`@quasar/app v1.0.0-beta.17` is required).

# Installation
To add this App Extension to your Quasar application, run the following (in your Quasar app folder):
```
quasar ext add qdatetimepicker
```

# Describe
You can use `quasar describe QDatetimePicker`

# Demo
Can be found [here](https://qdatetimepicker.netlify.com).

# Example Code
```html
<q-datetime-picker label="Standard Date Picker" v-model="date"></q-datetime-picker>
<q-datetime-picker outlined label="Outlined Date Picker" v-model="date"></q-datetime-picker>
<q-datetime-picker outlined label="Outlined Dark Time Picker" mode="time" color="negative" dark v-model="time"></q-datetime-picker>
<q-datetime-picker standout label="Standout DateTime Picker" mode="datetime" color="positive" dark v-model="datetime" format24h></q-datetime-picker>
```
and the data...
```js
data () {
  return {
    date: '2018-11-02',
    time: '15:46',
    datetime: '2018-11-02T15:46'
  }
}
```

# Other Examples

## styles
```html
<q-datetime-picker label="Standard Date Picker" v-model="date"></q-datetime-picker>
<q-datetime-picker outlined label="Outlined Date Picker" v-model="date"></q-datetime-picker>
<q-datetime-picker filled label="Filled Date Picker" v-model="date"></q-datetime-picker>
<q-datetime-picker standout label="Standout Date Picker" v-model="date"></q-datetime-picker>
```

## modes
```html
<q-datetime-picker mode="date" label="Date Mode" v-model="date"></q-datetime-picker>
<q-datetime-picker mode="time" label="Time Mode" v-model="time"></q-datetime-picker>
<q-datetime-picker mode="datetime" label="Date & Time Mode" v-model="datetime"></q-datetime-picker>
<q-datetime-picker label="Default Mode (date)" v-model="date"></q-datetime-picker>
```

## colors
```html
<q-datetime-picker label="Primary Color with Light Background" v-model="date"></q-datetime-picker>
<q-datetime-picker color="secondary" label="Secondary Color with Light Background" v-model="date"></q-datetime-picker>
<q-datetime-picker dark label="Primary Color with Dark Background" v-model="date"></q-datetime-picker>
<q-datetime-picker color="negative" dark label="negative Color with Dark Background" v-model="date"></q-datetime-picker>
```

## icons
```html
<q-datetime-picker label="A Customized Icon" v-model="date" icon="date_range"></q-datetime-picker>
```

## clearable
```html
<q-datetime-picker label="The value can be cleared" v-model="date" clearable"></q-datetime-picker>
```

## format24h
```html
<q-datetime-picker label="Time picker in the 24h format" mode="time" v-model="time" format24h></q-datetime-picker>
<q-datetime-picker label="Time picker in the 24h format" mode="datetime" v-model="time" format24h></q-datetime-picker>
```

## display-value
```html
<q-datetime-picker label="Format the date without force the calendar to gregorian and numeric system to latin" v-model="date" display-value></q-datetime-picker>
<q-datetime-picker label="Format the date in arab(egypt) using arab numeric system" v-model="date" lang="ar-EG" display-value></q-datetime-picker>
<q-datetime-picker label="Format the date using a computed property" v-model="date" display-value="computedProperty"></q-datetime-picker>
<q-datetime-picker label="Format the date using a filter" v-model="date" display-value="date | filter('args')"></q-datetime-picker>
```

## landscape
```html
<q-datetime-picker landscape mode="date" label="Landscape Date Mode" v-model="date"></q-datetime-picker>
<q-datetime-picker landscape mode="time" label="Landscape Time Mode" v-model="time"></q-datetime-picker>
<q-datetime-picker landscape mode="datetime" label="Landscape Date & Time Mode" v-model="datetime"></q-datetime-picker>
```

## today-btn
```html
<q-datetime-picker today-btn mode="date" label="Disabled Today Button" v-model="date"></q-datetime-picker>
```

## target
```html
<q-datetime-picker target="self" mode="date" label="DatetimePicker will act like Datetime Input from Quasar 0.17" v-model="date"></q-datetime-picker>
```

## date and time options
```html
<q-datetime-picker target="self" mode="date" label="Even Days" v-model="date" date-options="dateOptionsA"></q-datetime-picker>
<q-datetime-picker target="self" mode="date" label="Date Range" v-model="date" date-options="dateOptionsB"></q-datetime-picker>
<q-datetime-picker target="self" mode="time" label="Even Hours" v-model="time" time-options="timeOptionsA"></q-datetime-picker>
<q-datetime-picker target="self" mode="time" label="Non Human Friendly" v-model="time" time-options="timeOptionsB"></q-datetime-picker>
```
```js
export default {
  data () {
    return {
      dateOptionsA (date) {
        const parts = date.split('/')
        return parts[2] % 2 === 0
      },
      timeOptionsA (hr) {
        return hr % 2 === 0
      }
    }
  },
  methods: {
    dateOptionsB (date) {
      return date >= '2019/02/03' && date <= '2019/02/15'
    },
    timeOptionsB (hr, min, sec) {
      if (hr < 6 || hr > 15 || hr % 2 !== 0) {
        return false
      }
      if (min !== null && (min <= 25 || min >= 58)) {
        return false
      }
      if (sec !== null && sec % 10 !== 0) {
        return false
      }
      return true
    }
  }
}
```

# Language Files

We need help translating the language files. Below are listed the available ones. If you know another language, please PR and help us out.

## Completed languages
- German
- English
- French
- Italian
- Portuguese

---

# QDatetimePicker Vue Properties
| Vue&nbsp;Property | Type	|  Description |
|---|---|---|
| label | String | A text label that will `float` up above the input field, once the field gets focus |
| stack-label | Boolean | Label will be always shown above the field regardless of field content (if any) |
| hint | String | Helper (hint) text which gets placed below your wrapped form component |
| hide-hint | Boolean | Hide the helper (hint) text when field is not focused |
| prefix | String | Prefix |
| suffix | String | Suffix |
| color | String | Color name from Quasar Color Palette; Overrides default dynamic color |
| bg-color | String | Color name from Quasar Color Palette; Overrides default dynamic color |
| dark | Boolean | Notify the component that the background is a dark color |
| loading | Boolean | Signals to the user that a process is in progress by displaying a spinner; Spinner can be customized by using the `loading`slot. |
| clearable | Boolean | Appends clearable icon when a value (not undefined or null) is set; When clicked, model becomes null |
| clear-icon | Boolean | Custom icon to use for the clear button when using along with `clearable` prop |
| filled | Boolean | Use `filled` design for the field |
| outlined | Boolean | Use `outlined` design for the field |
| borderless | Boolean | Use `borderless` design for the field |
| standout | Boolean | Use `standout` design for the field |
| bottom-slots | Boolean | Enables bottom slots (`error`, `hint`, `counter`) |
| counter | Boolean | Show an automatic counter on the bottom right |
| rounded | Boolean | Applies a small standard border-radius for a squared shape of the component |
| square | Boolean | Remove border-radius so borders are squared; Overrides `rounded` prop |
| dense | Boolean | Dense mode; occupies less space |
| items-aligned | Boolean | Align content to match QItem |
| disable | Boolean | Put component in disabled mode |
| readonly | Boolean | Put component in readonly mode |
| lang | Boolean | Language identifier (default: $q.lang.isoName) |
| mode | String | Display Mode (`date`, `time`, `datetime`) (default: `date`) |
| format24h | Boolean | Show the timepicker in 24 hour format. The masked value will not be affected. |
| display-value | Boolean or String | If the value is `true` or a `string`, the internal QInput will be readonly. If the value is `true` the calendar and numeric system used to format the date will not be forced to be the gregorian calendar and latin numbers. If value is a `string`, the format function will be ignored and the `display-value` will be used directly in the `input` (default: `false`) |
| icon | String | The icon of the picker (default: `access_time` when the mode is `time`, otherwise `event`) |
| landscape | Boolean | Show the picker in landscape mode (default: false) |
| today-btn | Boolean | Display a button that selects the current day (`date` and `datetime` modes only) (default: false) |
| cover | Boolean | Allows the picker to cover its target. When used, the `fit` props are no longer effective (default: `true`) |
| fit | Boolean | Allows the picker to match at least the full width of its target (default: `true` when target is `self`, otherwise `false`) |
| anchor | String | Two values setting the starting position or anchor point of the menu relative to its target (`top left`, `top middle`, `top right`, `center left`, `center middle`, `center right`, `bottom left`, `bottom middle` or `bottom right`) |
| target | String | Target Mode (`self`: the picker will be opened when the input is clicked, `icon`: the picker will be opened when the icon is clicked) (default: `icon`) |
| calendar | String | Calendar Mode (`gregorian`, `persian`) (default: `gregorian`) |
| date-options | Function or Array | A list of events to highlight on the calendar; If using a function, it receives the date as a String and must return a Boolean (matches or not) |
| time-options | Function | Optionally configure what time the user allowed to set |
| default-standard | String | serialization standard, the property will be ignored if value isn't null (`iso`, `quasar`) (eg.: `iso`: `yyyy-MM-ddTHH:mm`, `quasar`: `yyyy/MM/dd HH:mm`) (default: `iso`) |

# Patreon
If you like (and use) this App Extension, please consider becoming a Quasar [Patreon](https://www.patreon.com/quasarframework).
