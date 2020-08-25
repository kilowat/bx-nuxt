<template>
<div class="basket">
  <div class="basket-items" v-if="basket!=undefined && basket.COUNT > 0">
    <div class="item" v-for="item in basket.ITEMS" :key="item.ID">
      <div class="item-pic">
        <img :src="item.PICTURE" alt="">
      </div>
      <div class="item-name">
        <nuxt-link :to="{ name:'product', params: { id: item.PRODUCT_ID } }">{{ item.NAME }}</nuxt-link>
      </div>
      <div class="quantity-row">
        {{ item.QUANTITY }} x {{ item.PRICE }}  {{ item.POSITION_PRICE }}
      </div>
      <div class="input-row">
        <button @click="setQty(item, item.QUANTITY - 1)">-</button>
        <input :value="item.QUANTITY" @change="setQty(item, $event.target.value)">
        <button @click="setQty(item, item.QUANTITY + 1)">+</button>
      </div>
    </div>
  </div>
</div>

</template>
<script>
export default {
  data(){
    return {
     
    }
  },
  computed: {
    basket() {
      return this.$store.getters['basket/getBasket'];
    }
  },
  methods: {
    clear() {
      this.$store.dispatch('basket/clear')
    },
    setQty(item, val) {
      console.log(val);
    },
    update(id, qty) {

    }
  }
}
</script>