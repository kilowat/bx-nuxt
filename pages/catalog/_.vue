<template>
  <div class="flex-wrapper-sidebar">
    <SideBar>
      <client-only>
        <CatalogFilter @set-smart-filter="onSetFilter" :filterData="page.filter" :navId="page.nav.id"/>
      </client-only>
    </SideBar>
    <div class="content">
      <Breadcrumbs :crumbsItems="crumbsItems"/>
      <SortPanel :sortData="page.sorting" @onSort="sort"/>
      <div>{{ page.section.NAME }}</div>
      <div class="items">
        <div class="item" v-for="item in page.items" :key="item.ID">
          <div><nuxt-link :title="item.NAME" :to="{ name: 'product-id', params: { id: item.ID } }">{{ item.NAME }}</nuxt-link></div>
          <div>ID:{{ item.ID }}</div>
          <div><img :src="item.RESIZE_PREVIEW_PICTURE.small.src" alt=""></div>
          <div>Цена:{{ item.PRICE }}</div>
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
  </div>
</template>
<script>
import { mapState } from 'vuex';
import CatalogFilter from '~~/components/catalog/CatalogFilter.vue';
import SideBar from '~~/components/SideBar.vue';
import Paginate from '~~/components/Pagenation.vue';
import SortPanel from '~~/components/SortPanel.vue';
import Breadcrumbs from '~~/components/Breadcrumbs.vue';

export default {
  async asyncData({ app, params, route, error }){
    try{
      await app.store.dispatch('catalog/fetchCatalogList', route.fullPath )
    }catch(err){
      console.log(err)
      return error({
        statusCode: 404,
        message: 'Категория не найдена или сервер не доступен'
      })
    }
  },
  data() {
    return {
    }
  },
  components: {
    CatalogFilter,
    SideBar,
    Paginate,
    SortPanel,
    Breadcrumbs
  },
  mounted() {

  },
  created() {

  },
  computed: {
    page(){
      return this.$store.getters['catalog/catalogListPage'];
    },
    crumbsItems() {
      return [
        {
          title: this.page.section.NAME,
          link: '',
        }
      ]
    },
  },
  head () {
    return {
      title: this.page.section.NAME,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.section.NAME
        }
      ],
    }
  },
  methods: {
    onSetFilter(params) {
      console.log(params);
      this.$router.push({
        path: params.filterUri,
        query: this.$route.query,
      }, async()=>{
        let result = await this.$store.dispatch('catalog/fetchCatalogList', params.filterParams);
      });
    },
    setPage(pageId) {
      let queryParam = {};
      queryParam[this.page.nav.id] = 'page-' + pageId;
      this.updatePage(queryParam);
    },
    sort(order) {
      this.updatePage({order: order});
    },
    updatePage(queryParams) {
      let query = Object.assign({}, this.$route.query);
      
      for (let i in queryParams) {
        query[i] = queryParams[i];
      }

      this.$router.push({
          path: this.$route.path,
          query: query,
      }, async()=>{
        await this.$store.dispatch('catalog/fetchCatalogList', this.$route.fullPath );
      });
    },
  }
}
</script>