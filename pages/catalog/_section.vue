<template>
  <div class="flex-wrapper-sidebar" v-if="page != undefined">
    <SideBar>
      <client-only>
        <CatalogFilter v-if="page.filter != undefined" @set-smart-filter="onSetFilter" :filterData="page.filter"/>
      </client-only>
    </SideBar>
    <div class="content">
      <Breadcrumbs :crumbsItems="crumbsItems"/>
      <SortPanel :sortData="page.sorting" @onSort="sort"/>
      <h1>{{ page.section.NAME }}</h1>
      <div class="catalog">
        <Loading :active="loading" :fade="true"/>
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
  </div>
</template>
<script>

import CatalogFilter from '~/components/catalog/CatalogFilter.vue';
import SideBar from '~/components/SideBar.vue';
import SortPanel from '~/components/SortPanel.vue';
import CatalogItem from '~/components/catalog/CatalogItem.vue';


export default {
  async asyncData({ app, params, route, error }){
    try{
      await app.store.dispatch('catalog/fetchCatalogList', route.fullPath )
    }catch(err){
      return error({
        statusCode: err.response.status,
        message: err.response.statusText
      })
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  components: {
    CatalogFilter,
    SideBar,
    SortPanel,
    CatalogItem,
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
    if( !this.page ) {
      return {}
    }
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
        this.loading = true;
        let result = await this.$store.dispatch('catalog/fetchCatalogList', params.filterParams);
        this.loading = false;
        this.$scrollTo('body');
      });
    },
    updatePage(queryParams) {
      this.$makeParamRequest(queryParams, async (url)=>{
        this.loading = true;
        await this.$store.dispatch('catalog/fetchCatalogList', url );
        this.loading = false;
      });
    },
    setPage(selected) {
      this.updatePage(selected.queryParam);
      this.$scrollTo('body');
    },
    sort(order) {
      this.updatePage({order: order});
    },
  }
}
</script>