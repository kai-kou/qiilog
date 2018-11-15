export function state() {
  return {
    version: null,
    item: {},
  }
}

export const mutations = {
  setVersion(state, version: string) {
    state.version = version
  },
  setItem(state, item: {}) {
    state.item = item
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    commit('setVersion', '0.0.3')
    const res = await this.$axios.$get('/items/f1623ac1f3d7aaab23fe')
    commit('setItem', res)
  },
}
