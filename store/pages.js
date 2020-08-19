export const state = () => ({
  list: []
})

export const getters = {
  list: state => {
    return state.list;
  }
};

export const mutations = {
  setList(state, pageList) {
    state.list = pageList;
  }
};
export const actions = {
  async fetchAll({ commit }) {
    let pageList = await this.$axios.$get(this.$api('/pages'));
    commit('setList', pageList);
  }
};
