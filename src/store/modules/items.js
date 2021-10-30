const state = () => ({
    all: [
        { id: 1, name: 'Item 1', price: '102', updated: null },
        { id: 2, name: 'Item 2', price: '202', updated: null },
        { id: 3, name: 'Item 3', price: '302', updated: null },
      ],
})

const getters = {}

const actions = {
  changePrice({ commit }, payload) {
    commit('changePrice', payload)
  }
}

const mutations = {
  changePrice (state, payload) {
    let itemId = state.all.findIndex(x => x.id == payload.id)
    state.all[itemId].price = payload.price
    state.all[itemId].updated = new Date()
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}