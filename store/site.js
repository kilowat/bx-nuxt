export const state = () => ({
  info: {}
})

export const getters = {
  info: state => {
    return state.info;
  }
};

export const mutations = {
  setInfo(state, info) {
    state.info = info;
  }
};
export const actions = {
  async fetchInfo({ commit }) {
    let info = await this.$axios.$get(this.$api('/siteInfo'));
    commit('setInfo', info);
  }
};
