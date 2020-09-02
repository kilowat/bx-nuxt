<template>
  <div class="content page-content">
    <Breadcrumbs :crumbsItems="crumbsItems"/>
    <h1>Поиск</h1>
    <div class="catalog-search">
      <div class="search-input">
        <input 
          autocomplete="false"
          type="text" 
          v-model="query" 
          class="text-input search-input" 
          placeholder="Введите поисковой запрос" 
          size="15"
          @keyup.enter="search"
          maxlength="200">
          <button @click="search">Искать</button>
      </div>
      <client-only>
        <div class="catalog">
          <Loading :active="loading" fade="true"/>
          <div class="search-result" v-show="!empty">
            <SortPanel v-if="sortData" @onSort="sort" :sortData="sortData"/>
            <CatalogList :items="items" :cols="4" />
            <paginate
              v-if="nav"
              :navId="nav.id"
              :click-handler="setPage"
              :page-count="nav.totalPage"
              :page-range="nav.pageSize"
              :prev-text="'Назад'"
              :next-text="'Вперед'"
              :container-class="'pagenation'">
            </paginate>
          </div>
          <div class="search-result" v-show="empty && query.length > 0">
            <div class="items message-empty">По запросу {{ $route.query.query }} ничего не найдено</div>
          </div>
        </div>
      </client-only>
    </div>
  </div>

</template>

<script>
import CatalogList from '~/components/catalog/CatalogList.vue';
import SortPanel from '~/components/SortPanel.vue';
import paginate from '~/components/Pagenation.vue';

export default {
  head () {
    return {
      title: "Поиск",
    }
  },
  data() {
    return {
      items: [],
      query: "",
      empty: false,
      loading: false,
      sortData: false,
      nav: false,
    }
  },
  components: {
    CatalogList,
    SortPanel
  },
  mounted() {
    if (this.$route.query.query != undefined) {
      this.query = this.$route.query.query;
      this.update();
    }
  },
  computed: {
    crumbsItems() {
      return [
        {
          title: "Поиск",
          link: '',
        }
      ]
    },
  },
  methods: {
    search() {
      let params = { query: this.query };
     
     if (this.nav) {
        params[this.nav.id] = `page-1`;
      }

      this.$makeParamRequest(params, (url)=>{
        this.update(url);
      });
    },
    async update(url) {
      url = url || this.$route.fullPath;
      this.loading = true;
      let { data } = await this.$axios.get(this.$api(url));
      if (!data.items) {
        this.items = [];
        this.empty = true;
      } else {
        this.empty = false;
        this.items = data.items;
        this.sortData = data.sorting
        this.nav = data.nav;
      }
      this.loading = false;
    },
    setPage(selected) {
      this.$makeParamRequest(selected.queryParam, (url)=>{
        this.update(url);
      });
      this.$scrollTo('body');
    },
    sort(order) {
      this.$makeParamRequest({ order: order }, (url)=>{
        this.update(url);
      });
    },
  }
}
</script>

<style>

</style>
