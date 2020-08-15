<template>
  <div class="flex-wrapper-sidebar">
    <SideBar>
        <CatalogFilter :filterData="page.filter" :navId="page.nav.id"/>
    </SideBar>
    <div class="content">
      <SortPanel :sortData="page.sorting" @onSort="sort"/>
      <div>{{ page.section.NAME }}</div>
      <div class="items">
        <div class="item" v-for="item in page.items" :key="item.ID">
          <h2>{{ item.NAME }}</h2>
          <div>{{ item.ID }}</div>
          <div>{{ item.PRICE }}</div>
        </div>
      </div>
      <div class="pagenation">
        <paginate
          :navId="page.nav.id"
          :click-handler="setPage"
          :page-count="page.nav.totalPage"
          :page-range="page.nav.pageSize"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'className'">
        </paginate>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import CatalogFilter from '~~/components/catalog/CatalogFilter.vue';
import SideBar from '~~/components/SideBar.vue';
import Paginate from '~~/components/Pagenation.vue';
import SortPanel from '~~/components/SortPanel.vue';

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
    SortPanel
  },
  mounted() {
   
  },
  created() {
    this.$nuxt.$on('set-smart-filter', params => this.onSetFilter(params));
  },
  computed: {
    page(){
      return this.$store.getters['catalog/catalogListPage'];
    }
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
      ]
    }
  },
  methods: {
    onSetFilter(params) {
      this.$router.push({
        path: params.filterUri,
        query: this.$route.query,
      }, async()=>{
        let result = await this.$store.dispatch('catalog/fetchCatalogList', params.filterParams);
        this.$nuxt.$emit('update-smart-filter', this.page.filter);
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