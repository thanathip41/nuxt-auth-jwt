export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}
export const actions = {
  async nuxtServerInit ({ commit }, { req, res }) {
  }
}
