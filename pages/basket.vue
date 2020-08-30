<template>
  <div class="content page-content">
    <Breadcrumbs :crumbsItems="crumbsItems"/>
    <h1>Корзина</h1>
    <Basket />
  </div>

</template>

<script>

import Basket from '~/components/basket/Basket.vue';

export default {
  head () {
    return {
      title: 'Корзина заказа',
    }
  },
  data() {
    return {
    }
  },
  components: {
    Basket,
  },
  computed: {
    crumbsItems() {
      return [
        {
          title: 'Корзина',
          link: '',
        }
      ]
    },
  }
}
</script>

<style lang="scss">

</style>
