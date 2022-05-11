import { createStore } from 'vuex'

export default createStore({
  state: {
    user: ''
  },
  getters: {
    getUser: (state) => state.user
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
