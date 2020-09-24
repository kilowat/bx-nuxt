<template>
  <div class="main-page">
    <client-only>
      <MainSlider :slides="page.mainSlider"/>
      <div slot="placeholder" >
        <div class="slide-loading">Загрузка</div>
      </div>
    </client-only>
    <div class="product-top">
      <h2 class="row-title text-center">Топ товаров</h2>
      <ProductSlider :items="page.productTop"/>
    </div>
    <div class="page-text about-main">
      <h1 class="text-center">{{ page.PROPERTIES.SECTION_NAME.VALUE }}</h1>
      <div class="wrapper">
        <div class="about-photo">
          <img :src="page.RESIZE_DETAIL_PICTURE.small.src" :alt="page.NAME">
        </div>
        <div class="about-text">
          <div v-html="page.DETAIL_TEXT"></div>
          <div class="row">
            <a href="#" class="btn btn-primary btn-inline" title="#">Подробнее</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainSlider from '~/components/MainSlider.vue';
import ProductSlider from '~/components/ProductSlider.vue';

export default {
  async asyncData({ app, params, $axios, route, error }) {
    try{
      let { data } = await $axios.get(app.$api('/page/index'));

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
  .about-main{
    .wrapper{
      @include row-flex();
    }
    .about-text{
      @include col();
      @include size(6);
    }
    .about-photo{
      @include col();
      @include size(6);
      img{
        max-width: 100%;
      }
    }
  }
</style>
