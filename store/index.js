import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: {
      authUser: null
    },

    mutations: {
      authUser(state, payload) {
        state.authUser = payload
      }
    }
  })

export default store
