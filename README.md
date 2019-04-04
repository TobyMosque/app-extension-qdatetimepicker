QDatetimePicker (quasar-app-extension-qdatetimepicker)
===

QDatetimePicker is an `UI App Extension` for [Quasar Framework v1](https://v1.quasar-framework.org/). It will not work with legacy versions of Quasar Framework.

This work is currently in `alpha` and there are expected changes while things get worked out. Your help with testing is greatly appreciated.

# Installation
To add this App Extension to your Quasar application, run the following (in your Quasar app folder):
```
quasar ext add qdatetimepicker
```

# Describe
You can use `quasar describe QDatetimePicker`

# Demo
Can be found [here](https://qmediaplayer.netlify.com).

# Example Code
```html
<q-datetime-picker label="Standard Date Picker" v-model="date"></q-datetime-picker>
<q-datetime-picker outlined label="Outlined Date Picker" v-model="date"></q-datetime-picker>
<q-datetime-picker outlined label="Outlined Dark Time Picker" :time="true" color="negative" dark v-model="time"></q-datetime-picker>
<q-datetime-picker standout label="Standout DateTime Picker" :date="true" :time="true" color="positive" dark v-model="datetime"></q-datetime-picker>
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

# Language Files

We need help translating the language files. They are all currently using English. If you know another language, please PR and help us out.

## Completed languages
- English
- Portuguese

---

# QDatetimePicker Vue Properties
| Vue&nbsp;Property | Type	|  Description |
|---|---|---|
| label | String | A text label that will 'float' up above the input field, once the field gets focus |
| stack-label | Boolean | Label will be always shown above the field regardless of field content (if any) |
| hint | String | Helper (hint) text which gets placed below your wrapped form component |
| hide-hint | Boolean | Hide the helper (hint) text when field is not focused |
| prefix | String | Prefix |
| suffix | String | Suffix |
| color | String | Color name from Quasar Color Palette; Overrides default dynamic color |
| bg-color | String | Color name from Quasar Color Palette; Overrides default dynamic color |
| dark | Boolean | Notify the component that the background is a dark color |
| loading | Boolean | Signals the user a process is in progress by displaying a spinner; Spinner can be customized by using the 'loading' slot. |
| clearable | Boolean | Appends clearable icon when a value (not undefined or null) is set; When clicked, model becomes null |
| clear-icon | Boolean | Custom icon to use for the clear button when using along with 'clearable' prop |
| filled | Boolean | Use 'filled' design for the field |
| outlined | Boolean | Use 'outlined' design for the field |
| borderless | Boolean | Use 'borderless' design for the field |
| standout | Boolean | Use 'standout' design for the field |
| bottom-slots | Boolean | Enables bottom slots ('error', 'hint', 'counter') |
| counter | Boolean | Show an automatic counter on the bottom right |
| rounded | Boolean | Applies a small standard border-radius for a squared shape of the component |
| square | Boolean | Remove border-radius so borders are squared; Overrides 'rounded' prop |
| dense | Boolean | Dense mode; occupies less space |
| items-aligned | Boolean | Align content to match QItem |
| disable | Boolean | Put component in disabled mode |
| readonly | Boolean | Put component in readonly mode |
| lang | Boolean | Language identifier (default: $q.lang.isoName) |
| date | Boolean or Object | If this prop has a value, the datepicker will be shown. If the value is an object, it will be used as the option to format the date. see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat |
| time | Boolean or Object | If this prop has a value, the timepicker will be shown. If the value is an object, it will be used as the options to format the time. see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat |
| format24h | Boolean | Show the timepicker in 24 hour format. The masked value will not be affected. |

# Patreon
If you like (and use) this App Extension, please consider becoming a Quasar [Patreon](https://www.patreon.com/quasarframework).
