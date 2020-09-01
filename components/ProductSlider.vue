<template>
  <div class="product-slider">
    <h2>Топ товаров</h2>
    <swiper ref="productSwiper" :options="swiperOption">
      <swiper-slide  v-for="item in items" :key="item.ID">
        <div class="slide-item">
          <CatalogItem :item="item"/>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import CatalogItem from '~/components/catalog/CatalogItem.vue';
export default {
  props: ['items'],
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
      },
    }
  },
  mounted() {
   
  },
  components: {
    CatalogItem
  },
  methods:{

  }
}
</script>
<style lang="scss" scoped>
  .product-slider{
    margin-top: 2em;
    margin-bottom: 2em;
  }
  .slide-item{
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
    img{
      max-width: 100%;
      height: auto;
    }
  }
</style>