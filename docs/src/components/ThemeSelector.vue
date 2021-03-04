<template>
  <div class="qdtp-theme-selector">
    <q-fab v-model="themeFab" flat dense :label="$t('theme.title')" external-label vertical-actions-align="right" :icon="icon" direction="down" >
      <q-fab-action class="text-invert" label-position="left" icon="mdi-theme-light-dark" @click="setTheme('auto')" :label="$t('theme.auto')" external-label />
      <q-fab-action class="text-invert" label-position="left" icon="mdi-weather-sunny" @click="setTheme(false)" :label="$t('theme.light')" external-label />
      <q-fab-action class="text-invert" label-position="left" icon="mdi-weather-night" @click="setTheme(true)" :label="$t('theme.dark')" external-label />
    </q-fab>
  </div>
</template>

<style lang="sass">
  .qdtp-theme-selector
    .q-btn--fab .q-btn__wrapper
      padding: 0
      .q-fab__icon-holder,
      img
        width: 56px
        height: 56px
    .q-btn--fab-mini .q-btn__wrapper
      padding: 0
      img
        width: 40px
        height: 40px
</style>

<script>
export default {
  name: 'QdtpThemeSelector',
  data () {
    return {
      themeFab: false
    }
  },
  computed: {
    icon () {
      if (this.$vault.app.dark === undefined || this.$vault.app.dark === 'auto') {
        return 'mdi-theme-light-dark'
      }
      return this.$vault.app.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'
    }
  },
  methods: {
    setTheme (value) {
      this.$q.dark.set(value)
    }
  }
}
</script>
