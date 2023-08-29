import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      search: {}
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})

export default store;