<template>
  <div class="main-slider">
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide  v-for="slide in slides" :key="slide.ID">
        <div class="item">
          <img :src="slide.RESIZE_DETAIL_PICTURE.big.src" alt="">  
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
export default {
  props: ['slides'],
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
    }
  },
  mounted() {
   
  },
  methods:{

  }
}
</script>
<style lang="scss">
  .main-slider{
    height: 450px;
  }
</style>