import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

export default async (context, inject) => {
  Vue.use(VueLazyload, {
    preLoad: 0,
    error: '/no-photo.png',
   // loading: require(`${'~~/assets/svg/download.svg'}`),
    attempt: 3,
    lazyComponent: true,
    observer: true,
    throttleWait: 500
  })
}