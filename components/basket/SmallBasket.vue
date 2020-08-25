<template>
<div>
  <div v-if="basket!=undefined && basket.COUNT > 0">
    <nuxt-link :to="{ name: 'basket' }">В корзину</nuxt-link>
    Кол-во: {{ basket.COUNT }} на {{ basket.PRICE }}
  </div>
</div>

</template>
<script>
export default {
  computed: {
    basket() {
      console.log(this.$store.getters['basket/getBasket']);
      return this.$store.getters['basket/getBasket'];
    }
  },
  methods: {
    clear() {
      this.$store.dispatch('basket/clear')
    }
  }
}
</script>