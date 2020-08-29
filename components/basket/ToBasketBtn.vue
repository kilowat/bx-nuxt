<template>
  <div>
    <div v-if="!inBasket && item.AVAILABLE == 'Y'">
      <button @click="add">add</button>
      <input type="text" v-model="quantity">
    </div>
    <div v-else-if="inBasket">
      <button >Добавлен</button>
    </div>
    <div v-else>Не доступен</div>
  </div>
</template>
<script>
export default {
  props: ['item'],
  data() {
    return {
      quantity: 1,
    }
  },
  computed: {
    id() {
      let id = this.item.ID;
      if (this.item.OFFERS && this.item.OFFERS.length > 0) {
        let offers = this.item.OFFERS;

        for (let i in offers) {
          if (offers[i].AVAILABLE == 'Y') {
            id = offers[i].ID;
            break;
          }
        }
      }
      return id;
    },
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