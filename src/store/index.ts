export function state() {
  return {
    version: null,
    items: [],
    item: {},
  }
}

export const mutations = {
  setVersion(state, version: string) {
    state.version = version
  },
  setItems(state, items: []) {
    state.items = items
  },
  setItem(state, item: {}) {
    state.item = item
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    commit('setVersion', '0.0.3')

    this.$axios.defaults.headers.common['Authorization'] = 'Bearer xxx';
    const items = await this.$axios.$get('/authenticated_user/items')
    commit('setItems', items)
  },
  async getItem({ commit }, params) {
    const item = await this.$axios.$get('/items/' + params.item_id)
    commit('setItem', item)
  }
}
