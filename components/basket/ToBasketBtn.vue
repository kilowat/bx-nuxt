<template>
  <div>
    <div v-if="!inBasket">
      <button @click="add">add</button>
      <input type="text" v-model="quantity">
    </div>
    <div v-else>
      <button >Добавлен</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      quantity: 1,
    }
  },
  computed: {
    inBasket() {
      let basket = this.$store.getters['basket/getBasket'];
      if (basket != undefined && basket.ITEMS != undefined) {
        for (let i in basket.ITEMS) {
          if (basket.ITEMS[i].PRODUCT_ID == this.id) {
            return true;
          }
        }
      }
      return false;
    }
  },
  methods: {
    async add() {
      try {
        await this.$store.dispatch('basket/add', { id: this.id, QUANTITY: this.quantity } );
        let basket = this.$store.getters['basket/getBasket'];
        
        if (basket != undefined && basket.ITEMS != undefined) {
          for (let i in basket.ITEMS) {
            if (basket.ITEMS[i].PRODUCT_ID == this.id) {
              let addedProduct = basket.ITEMS[i];
              $nuxt.$emit('product-added-to-basket');
              console.log(addedProduct.NAME + " Добавлен");
              break;
            }
          }
        }
      } catch(e) {
        console.log(e);
      }
    },
  }
}
</script>