<template>
<div class="basket" v-if="basket!=undefined && basket.COUNT > 0">
  <Loading :active="loading"/>
  <div class="basket-items">
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
        <button :disabled="loading" @click="setQty(item, item.QUANTITY - 1)">-</button>
        <input :disabled="loading" :value="item.QUANTITY" @change="setQty(item, $event.target.value)">
        <button :disabled="loading"  @click="setQty(item, item.QUANTITY + 1)">+</button>
      </div>
    </div>
  </div>
  <div class="basket-sum">Всего цена: {{ basket.PRICE_WITHOUT_DISCOUNT }}</div>
  <div class="basket-sum">Всего со скидкой: {{ basket.PRICE }}</div>
</div>

</template>
<script>


export default {
  data(){
    return {
      loading: false,
    }
  },
  computed: {
    basket() {
      return this.$store.getters['basket/getBasket'];
    }
  },
  components: {

  },
  methods: {
    clear() {
      this.$store.dispatch('basket/clear')
    },
    setQty(item, val) {
      this.update(item.BASKET_ID, val)
    },
    async update(id, qty) {
      let params = {
        id: id,
        QUANTITY: qty,
      };
      
      this.loading = true;
      await this.$store.dispatch('basket/update', params)
      this.loading = false;
    }
  }
}
</script>