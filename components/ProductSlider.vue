<template>
  <div class="product-slider">
    <h2>Топ товаров</h2>
    <swiper ref="productSwiper" :options="swiperOption">
      <swiper-slide  v-for="item in items" :key="item.ID">
        <div class="slide-item">
          <img :src="item.RESIZE_PREVIEW_PICTURE.small.src" alt="">
          <div>{{ item.NAME }}</div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
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
    border: 1px solid #ccc;
    height: 280px;
    margin-left: 5px;
    margin-right: 5px;
    img{
      max-width: 100%;
      height: auto;
    }
  }
</style>