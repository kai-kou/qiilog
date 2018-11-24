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
    console.log('nuxtServerInit');
    this.$axios.defaults.headers.common['Content-Type'] = 'application/json';
    const items = await this.$axios.$get('/items.json')
    commit('setItems', items)
  },
  async getItem({ commit }, params) {
    const item = await this.$axios.$get('/items/' + params.item_id + '.json')
    commit('setItem', item)
  }
}
