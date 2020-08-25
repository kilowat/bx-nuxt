<template>
  <div class="content page-content">
    <Breadcrumbs :crumbsItems="crumbsItems"/>
    <h1>Корзина</h1>
    <Basket />
  </div>

</template>

<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
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
    Breadcrumbs,
    Basket
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

<style>

</style>
