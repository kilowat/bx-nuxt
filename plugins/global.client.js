import Vue from 'vue'
import Loading from '~/components/Loading.vue';
import VueScrollTo from 'vue-scrollto';
export default async (context, inject) => {
  Vue.use(Loading)
  Vue.use(VueScrollTo)
}