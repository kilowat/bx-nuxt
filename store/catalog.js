function getUri($uri){
  return 'http://192.168.1.48/api'+$uri;
}

export const state = () => ({
  sectionTree: [],
  catalogSectionPage: null
})

export const getters = {
  sectionTree: state => {
    return state.sectionTree
  },
  catalogListPage: state => {
    return state.catalogSectionPage
  }
};

export const mutations = {
  setCatalogSectionPage(state, page){
    state.catalogSectionPage = page;
  },
  setSectionTree(state, sections){
    state.sectionTree = sections;
  }
};
export const actions = {
  async fetchCatalogList({commit}, path){
    let page = await this.$axios.$get(getUri(path));

    commit('setCatalogSectionPage', page);
  },
  async fetchSectionsTree({commit} ) {
    const sections = await this.$axios.$get(getUri('/catalog-menu'));
    commit('setSectionTree', sections);
  }
};
