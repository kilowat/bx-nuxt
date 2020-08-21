<template>
  <div class="main-page">
    <client-only>
      <MainSlider :slides="page.mainSlider"/>
      <div slot="placeholder" >
        <div class="slide-loading">Загрузка</div>
      </div>
    </client-only>
    <div class="page-text" v-html="page.DETAIL_TEXT"></div>
    <ProductSlider :items="page.productTop"/>
  </div>
</template>

<script>
import MainSlider from '~/components/MainSlider.vue';
import ProductSlider from '~/components/ProductSlider.vue';

export default {
  async asyncData({ app, params, $axios, route, error }) {
    try{
      let { data } = await $axios.get(app.$api('/page/index'))
      return { page : data };
    }catch(err){
      return error({
        statusCode: err.response.status,
        message: err.response.statusText
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
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  components: {
    MainSlider,
    ProductSlider
  },
  directives: {
 
  }
}
</script>

<style lang="scss">
  .slide-loading{
    height: 450px;
    width: 100%;
    background-color: #ccc;
  }
</style>
