export const actions = {
  async nuxtServerInit ({ dispatch, getters }, { req }) {
    
    if (getters['catalog/sectionTree'].length == 0) {
      try {
        await dispatch('catalog/fetchSectionsTree');
      } catch(e) {
        console.log(e);
      }
    }
  }
}
