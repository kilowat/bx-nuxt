<template>
  <div class="search-form top-search"
    @focusout="handleFocusOut"
    tabindex="0">
    <Loading :active="loading" fade="true" wrapper=".search-result .items"/>
    <div class="search-input-wrapper">
      <input 
        autocomplete="false"
        type="text" 
        @keyup="update" 
        @focus="show=true"
        v-model="query" 
        class="search-input text-input" 
        placeholder="Введите поисковой запрос" 
        size="15"
        @keyup.enter="gotToSearch()"
        maxlength="200">
        <button class="search-btn" @click="gotToSearch"><searchSvg /></button>
    </div>
    <div class="search-result" v-show="show"  v-if="!empty && query.length > 0">
      <div class="items">
        <div class="item" v-for="item in items" :key="item.ID">
          <nuxt-link :to="{ name: 'product-id', params: { id: item.ID } }" @click.native="show=false">
            <div class="item-wrapper">
              <div class="pic-cell">
                <span class="item-img" role="img" v-lazy:background-image="item.RESIZE_PREVIEW_PICTURE.small.src"></span>
              </div>
              <div class="item-content">
                <div class="item-name">{{ item.NAME }}</div>
                <div class="item-price">Цена: {{ item.PRICE }}</div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="search-result" v-if="empty && query.length > 0">
      <div class="items message-empty">Не найдено</div>
    </div>
  </div>
</template>
<script>
import searchSvg from '~/assets/svg/search.svg';

export default {
  data(){
    return {
      t: null,
      delay: 200,
      items: [],
      query: "",
      empty: false,
      loading: false,
      show: true,
    }
  },
  mounted() {

  },
  components: {
    searchSvg
  },
  methods: {
    update () {
      clearTimeout(this.t);
      this.t = setTimeout(this.search, this.delay);
    },
    async search() {
      this.loading = true;
      let { data } = await this.$axios.post(this.$api('catalog-search'), { query: this.query});
      if (!data) {
        this.items = [];
        this.empty = true;
      } else {
        this.empty = false;
        this.items = data;
      }
      this.loading = false;
    },
    gotToSearch() {
      this.$router.push('/catalog-search?query=' + this.query, ()=>{
        this.query = '';
      });
    },
    handleFocusOut() {
      this.show = false;
    }
  }
}
</script>
<style scoped lang="scss">
.search-result{
  position: relative;
}
.search-input-wrapper {
  display: flex;
  position: relative;
}
.search-input{
  padding-right: 32px;
}
.search-btn {
  height: 40px;
  position: absolute;
  right: 0;
  background-color: transparent;
  cursor: pointer;
  border: 0;
  display: flex;
  align-items: center;
  svg{
    fill: #919191;
  }
}
.items {
  background-color: #fff;
  z-index: 100;
  width: 456px;
  box-shadow: 1px 3px 4px 1px rgba(0,0,0,0.3);
  position: absolute;
  .item {
    padding: 0.3em;
    border-bottom: 1px solid #ccc;
    a{
      text-decoration: none;
      color: #000;
      &:hover{
        color: $color-link-hover;
      }
    }
    .item-wrapper{
      display: flex;
    }
    .pic-cell{
      margin-right: 10px;
    }
    .item-img{
      display: block;
      width: 100px;
      height: 80px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}

</style>