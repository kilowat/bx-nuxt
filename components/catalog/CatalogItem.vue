<template>
  <div class="catalog-item">
    <div>ID:{{ item.ID }}</div>
    <div><nuxt-link :title="item.NAME" :to="{ name: 'product-id', params: { id: item.ID } }">{{ item.NAME }}</nuxt-link></div>
    <div>
      <nuxt-link :title="item.NAME" :to="{ name: 'product-id', params: { id: item.ID } }">
        <span
          v-if="item.RESIZE_PREVIEW_PICTURE !=undefined" 
          class="item-img" 
          role="img" 
          v-lazy:background-image="item.RESIZE_PREVIEW_PICTURE.small.src"></span>
      </nuxt-link>
      </div>
    <div>Цена:{{ item.PRICE }}</div>
    <div class="to-basket-row">
      <ToBasketBtn :item="item"/>
    </div>
  </div>
</template>
<script>
import ToBasketBtn from '~/components/basket/ToBasketBtn.vue';

export default {
  props:['item'],
  components: {
    ToBasketBtn
  },
  computed:{
  }
}
</script>
<style lang="scss" scoped>
.catalog-item{  
  margin-bottom: 2em;
  .item-img{
    width: 100%;
    height: 200px;
    background-position: center;
    background-size: contain;
    display: block;
    background-repeat: no-repeat;
  }
  .to-basket-row{
    margin-top: 1em;
  }
}
</style>