export const state = () => ({
  user: {
    isAuthorized : false,
  }
})

export const getters = {
  getUser: state => {
    return state.user;
  }
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  }
};
export const actions = {
  async fetchUser({ commit }) {
    let user = await this.$axios.$get(this.$api('current-user'));
    commit('setUser', user);
  },
};
