<template>
  <div class="add-to-basket">
    <div v-if="!inBasket && item.AVAILABLE == 'Y'" class="add-to-basket-input">
      <div v-if="count" class="input-cell"><input type="text" class="text-input" v-model="quantity"></div>
      <div class="button-cell"><button class="btn btn-primary" @click="add">В корзину</button></div>
    </div>
    <div v-else-if="inBasket" class="button-cell in-basket">
      <nuxt-link to="/order" class="btn btn-grey">Добавлен</nuxt-link>
    </div>
    <div v-else class="not-avaiable">Не доступен</div>
  </div>
</template>
<script>
export default {
  props: ['item', 'count'],
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
            if (basket.ITEMS[i].PRODUCT_ID === this.id) {
              let addedProduct = basket.ITEMS[i];
              this.$nuxt.$emit(this.$eventMap.onProductAddedToBasket, addedProduct);
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
<style lang="scss">
.add-to-basket{
  .input-cell{
    margin-bottom: 10px;
    input{
      text-align: center;
    }
  }
  .button-cell{
    width: 180px;
    margin: auto;
  }
}

</style>