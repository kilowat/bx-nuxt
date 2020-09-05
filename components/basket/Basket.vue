<template>
<div class="basket" v-if="basket!=undefined && basket.COUNT > 0">
  <Loading :active="loading"/>
  <div class="basket-items">
    <div class="item" v-for="item in basket.ITEMS" :key="item.ID">
      <div class="item-pic">
        <img :src="item.PICTURE" alt="">
      </div>
      <div class="item-name">
        <nuxt-link :to="{ name:'product-id', params: { id: item.IS_OFFER ? item.IS_OFFER: item.PRODUCT_ID } }">{{ item.NAME }}</nuxt-link>
      </div>
      <div class="quantity-row">
        {{ item.QUANTITY }} x {{ item.PRICE }}  {{ item.POSITION_PRICE }}
      </div>
      <div class="input-row">
        <button :disabled="loading" @click="setQty(item, item.QUANTITY - 1)">-</button>
        <input :disabled="loading" class="text-input" :value="item.QUANTITY" @change="setQty(item, $event.target.value)">
        <button :disabled="loading"  @click="setQty(item, item.QUANTITY + 1)">+</button>
      </div>
    </div>
  </div>
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
      try {
        this.loading = true;
        await this.$store.dispatch('basket/update', params)

        this.$emit("on-after-update");
      } catch(err) {
        //err.response.status,
       // err.response.statusText
        console.log(err);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
<style lang="scss">
.basket{
  .item {
    display: flex;
    align-items: center;
  }
  .input-row {
    display: flex;
    width: 60px;
    input{
      text-align: center;
    }
  }
}
</style>