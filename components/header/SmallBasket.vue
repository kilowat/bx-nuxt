<template>
  <nuxt-link :to="{ name: 'basket' }" class="user-link" :class="{ selected: basket.TOTAL_COUNT > 0 }">
    <span class="count">{{ basket.TOTAL_COUNT }}</span>
    <CartSvg class="icon" />
    <span class="total-price" v-html="basket.HTML_PRICE"></span>
  </nuxt-link>
</template>

<script>
import CartSvg from '~/assets/svg/cart.svg';

export default {
  computed: {
    basket() {
      return this.$store.getters['basket/getBasket'];
    }
  },
  components: {
    CartSvg
  },
  methods: {
    clear() {
      this.$store.dispatch('basket/clear')
    }
  }
}
</script>
<style lang="scss" scroped>
  .total-price{
    margin-left: 15px;
    font-weight: 700;
    display: block;
    width: 65px;
  }
</style>