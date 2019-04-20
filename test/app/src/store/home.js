import Vue from 'vue'

export default {
  namespaced: true,
  mutations: {
    iso_empty_date (state, value) { state.iso_empty_date = value },
    iso_empty_time (state, value) { state.iso_empty_time = value },
    iso_empty_datetime (state, value) { state.iso_empty_datetime = value },
    iso_date (state, value) { state.iso_date = value },
    iso_time (state, value) { state.iso_time = value },
    iso_datetime (state, value) { state.iso_datetime = value },
    quasar_empty_date (state, value) { state.quasar_empty_date = value },
    quasar_empty_time (state, value) { state.quasar_empty_time = value },
    quasar_empty_datetime (state, value) { state.quasar_empty_datetime = value },
    quasar_date (state, value) { state.quasar_date = value },
    quasar_time (state, value) { state.quasar_time = value },
    quasar_datetime (state, value) { state.quasar_datetime = value },
    language (state, value) { state.language = value },
    languages (state, value) { Vue.set(state, 'languages', value) }
  },
  state () {
    return {
      iso_empty_date: '',
      iso_empty_time: '',
      iso_empty_datetime: '',
      iso_date: '2018-11-02',
      iso_time: '15:46',
      iso_datetime: '2018-11-02T15:46',
      quasar_empty_date: '',
      quasar_empty_time: '',
      quasar_empty_datetime: '',
      quasar_date: '2018/11/02',
      quasar_time: '15:46',
      quasar_datetime: '2018/11/02 15:46',
      language: '',
      languages: []
    }
  },
  actions: {
    init ({ commit }, obj) {
      commit('iso_empty_date', obj.iso_empty_date)
      commit('iso_empty_time', obj.iso_empty_time)
      commit('iso_empty_datetime', obj.iso_empty_datetime)
      commit('iso_date', obj.iso_date)
      commit('iso_time', obj.iso_time)
      commit('iso_datetime', obj.iso_datetime)
      commit('quasar_empty_date', obj.quasar_empty_date)
      commit('quasar_empty_time', obj.quasar_empty_time)
      commit('quasar_empty_datetime', obj.quasar_empty_datetime)
      commit('quasar_date', obj.quasar_date)
      commit('quasar_time', obj.quasar_time)
      commit('quasar_datetime', obj.quasar_datetime)
      commit('language', obj.language)
      commit('languages', obj.languages)
    }
  }
}
