<template>
  <div class="catalog-item">
    <div>ID:{{ item.ID }}</div>
    <div><nuxt-link :title="item.NAME" :to="{ name: 'product-id', params: { id: item.ID } }">{{ item.NAME }}</nuxt-link></div>
    <div>
      <nuxt-link :title="item.NAME" :to="{ name: 'product-id', params: { id: item.ID } }">
        <img
          v-if="item.RESIZE_PREVIEW_PICTURE != undefined"
          :width="item.RESIZE_PREVIEW_PICTURE.small.width" :height="item.RESIZE_PREVIEW_PICTURE.small.height" 
          v-lazy="item.RESIZE_PREVIEW_PICTURE.small.src" alt="">
      </nuxt-link>
      </div>
    <div>Цена:{{ item.PRICE }}</div>
    <div>
      <ToBasketBtn :id="buyId"/>
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
    buyId() {
      let id = this.item.ID;
      
      if (this.item.OFFERS && this.item.OFFERS.length > 0) {
        id = this.item.OFFERS[0].ID;
      }
      
      return id;
    }
  }
}
</script>
<style lang="scss" scoped>

</style>