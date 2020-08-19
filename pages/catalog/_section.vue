<template>
  <div class="flex-wrapper-sidebar">
    <SideBar>
      <client-only>
        <CatalogFilter v-if="page.filter != undefined" @set-smart-filter="onSetFilter" :filterData="page.filter"/>
      </client-only>
    </SideBar>
    <div class="content">
      <Breadcrumbs :crumbsItems="crumbsItems"/>
      <SortPanel :sortData="page.sorting" @onSort="sort"/>
      <h1>{{ page.section.NAME }}</h1>
      <div class="catalog-items">
        <CatalogItem  v-for="item in page.items" :key="item.ID" :item="item"/>
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

import CatalogFilter from '~~/components/catalog/CatalogFilter.vue';
import SideBar from '~~/components/SideBar.vue';
import Paginate from '~~/components/Pagenation.vue';
import SortPanel from '~~/components/SortPanel.vue';
import Breadcrumbs from '~~/components/Breadcrumbs.vue';
import CatalogItem from '~~/components/catalog/CatalogItem.vue';

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
    Breadcrumbs,
    CatalogItem
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
      let arr = [
        {
          title: 'Каталог',
          link: '/catalog/',
        }
      ];

      for (let i in this.page.section.PATH) {
        let route = this.$router.resolve({ 
          name: 'catalog-section',
          params: { section: this.page.section.PATH[i].CODE},
        });

        arr.push({
          title: this.page.section.PATH[i].NAME,
          link: route.href
        });
      }
   
      return arr;
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
      this.$router.push({
        path: params.filterUri,
        query: this.$route.query,
      }, async()=>{
        let result = await this.$store.dispatch('catalog/fetchCatalogList', params.filterParams);
        console.log(result);
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