<template>
<div>
  <div v-if="basket.COUNT > 0">
    <nuxt-link :to="{ name: 'basket' }">В корзину</nuxt-link>
    Кол-во: {{ basket.COUNT }} на {{ basket.PRICE }}
  </div>
  <div v-else>В корзине 0</div>
</div>

</template>
<script>
export default {
  computed: {
    basket() {
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