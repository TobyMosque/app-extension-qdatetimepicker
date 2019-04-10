import Vue from 'vue'

export default {
  namespaced: true,
  mutations: {
    date (state, value) { state.date = value },
    time (state, value) { state.time = value },
    datetime (state, value) { state.datetime = value },
    language (state, value) { state.language = value },
    languages (state, value) { Vue.set(state, 'languages', value) }
  },
  state () {
    return {
      date: '',
      time: '',
      datetime: '',
      language: '',
      languages: []
    }
  },
  actions: {
    init ({ commit }, obj) {
      commit('date', obj.date)
      commit('time', obj.time)
      commit('datetime', obj.datetime)
      commit('language', obj.language)
      commit('languages', obj.languages)
    }
  }
}
