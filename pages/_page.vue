<template>
  <div class="content page-content">
    <Breadcrumbs :crumbsItems="crumbsItems"/>
    <h1>{{ page.NAME }}</h1>
    <div class="text"  v-html="page.DETAIL_TEXT"></div>
  </div>

</template>

<script>
import Breadcrumbs from '~~/components/Breadcrumbs.vue';
export default {
    async asyncData({ app, params, $axios, route, error }) {
    try{
      let { data } = await $axios.get(app.$api(`/page/${route.params.page}`))
      return { page : data };
    }catch(err){
      console.log(err)
      return error({
        statusCode: 404,
        message: 'Страница не найдена или сервер не доступен'
      })
    }
  },
  head () {
    return {
      title: this.page.ELEMENT_META_TITLE,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.ELEMENT_META_DESCRIPTION
        }
      ],
    }
  },
  data() {
    return {
    }
  },
  components: {
    Breadcrumbs
  },
  computed: {
    crumbsItems() {
      return [
        {
          title: this.page.NAME,
          link: '',
        }
      ]
    },
  }
}
</script>

<style>

</style>
