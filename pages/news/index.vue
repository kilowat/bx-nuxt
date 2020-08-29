<template>
  <div class="news">
    <Breadcrumbs :crumbsItems="crumbsItems"/>
    <h1>Новости список</h1>
    <div class="news-list">
      <div class="news-item" v-for="item in page.items" :key="item.ID">
        <div class="news-name">{{ item.NAME }}</div>
        <div class="news-text" v-html="item.PREVIEW_TEXT"></div>
      </div>
    </div>
      <paginate
        :navId="page.nav.id"
        :click-handler="setPage"
        :page-count="page.nav.totalPage"
        :page-range="page.nav.pageSize"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagenation'">
      </paginate>
  </div>
</template>
<script>

export default {
  async asyncData({ app, params, $axios, route, error }) {
    try{
      let { data } = await $axios.get(app.$api(route.fullPath))
      return { page : data };
    }catch(err){
      return error({
        statusCode: err.response.status,
        message: err.response.statusText
      })
    }
  },
  data() {
    return {
      page: {}
    }
  },
  computed: {
    crumbsItems() {
      return [
        {
          title: 'Новости',
          link: '',
        }
      ]
    }
  },
  components: {
  },
  methods: {
    updatePage(queryParams) {
      this.$makeParamRequest(queryParams, async (url)=>{
        let { data } = await this.$axios.get(this.$api(url))
        this.page = data;
      });
    },
    setPage(selected) {
      this.updatePage(selected.queryParam);
    },
  }
}
</script>