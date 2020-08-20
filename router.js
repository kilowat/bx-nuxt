import Vue from 'vue'
import Router from 'vue-router'

import News from '~/pages/news/index.vue'

Vue.use(Router)

export function createRouter(ssrContext, createDefaultRouter, routerOptions) {
  const options = routerOptions ? routerOptions : createDefaultRouter(ssrContext).options

  return new Router({
    ...options,
    routes: fixRoutes(options.routes)
  })
}

function fixRoutes(defaultRoutes) {
  return defaultRoutes;
}

