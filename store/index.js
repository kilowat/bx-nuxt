export const actions = {
  async nuxtServerInit ( context ) {
    return Promise.all([
      context.dispatch('catalog/fetchSectionsTree'),
      context.dispatch('pages/fetchAll'),
      context.dispatch('site/fetchInfo'),
      context.dispatch('basket/getData'),
    ]);
  }
}
