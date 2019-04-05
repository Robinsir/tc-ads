import * as conf from '@/conf'
const state = {
  Options: {}
}

const mutations = {
  SAVE_OPTIONS (state, ops) {
    window.localStorage.setItem(conf.CONNECT_OPTIONS, JSON.stringify(ops))
    state.Options = ops
  },
  SAVE_WITHOUT_COOKIE (state, ops) {
    state.Options = ops
  }
}
const actions = {

  GET_INIT_VALUE (context) {
    let options = window.localStorage.getItem(conf.CONNECT_OPTIONS)
    options = JSON.parse(options)
    context.commit('SAVE_WITHOUT_COOKIE', options)
  }
}
const getters = {
  GET_OPTIONS (state) {
    return state.Options
  }
}
// const actions = {
//   INIT_OPTIONS (context) {
//     let options = window.localStorage.getItem(conf.CONNECT_OPTIONS)
//     options = JSON.parse(options)
//     context.commit('SAVE_OPTIONS', options)
//   }
// //   someAsyncTask ({ commit }) {
// //     // do something async
// //     commit('INCREMENT_MAIN_COUNTER')
// //   }
// }

export default {
  state,
  mutations,
  getters,
  actions
}
