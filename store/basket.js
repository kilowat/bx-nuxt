export const state = () => ({
  basket: []
})

export const getters = {
  getBasket: (state) => {
    return state.basket;
  }
};

export const mutations = {
  setBasket: (state, data) => {
    state.basket = data;
  }
}

export const actions = {
  async add({ commit }, params) {
    let { data } =  await this.$axios.post(this.$api(`basket/add/${params.id}`), params )
    if (data.error != null) {
      throw(data.error);
    }
    commit('setBasket', data.basket);
  },
  async getData({ commit }) {
    let { data } = await this.$axios.get(this.$api('basket/list'));
    commit('setBasket', data);
  },
  async update({ commit }, params) {
    let { data } = await this.$axios.post(this.$api(`basket/update/${params.id}`), params )
    if (data.error != null) {
      throw(data.error);
    }
    commit('setBasket', data);
  },
  async clear({ commit }) {
    let { data } = await this.$axios.post(this.$api('basket/clear'));
    commit('setBasket', data);
  },
  async setCoupon({ commit }, params) {
    let { data } = await this.$axios.post(this.$api('basket/coupon'), params);
    if (data.error != null) {
      throw(data.error);
    }
    commit('setBasket', data.basket);
  }
}