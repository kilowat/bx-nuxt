<template>
    <div class="content page-content">
      <Breadcrumbs :crumbsItems="crumbsItems"/>
      <h1>Корзина</h1>
      <client-only>
        <Loading :active="true" slot="placeholder"/>
        <div class="basket-page-wrapper" v-if="basket!=undefined && basket.COUNT > 0">
          <div class="basket-block">
            <Basket />
          </div>
          <div class="total-block">
            <div class="total-row">Сумма: <span v-html="basket.FORMAT_PRICE"></span></div> 
            <div class="total-row">
              <Coupon/>
            </div>
            <div class="total-row">
              <nuxt-link to="/order" class="btn btn-primary">Оформить</nuxt-link>
            </div>
          </div>
        </div>
        <div class="emtpy-basket" v-else>
          Корзина пуста
        </div>
      </client-only>
    </div>
</template>

<script>

import Basket from '~/components/basket/Basket.vue';
import Coupon from '~/components/basket/Coupon.vue';

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
    Coupon
  },
  computed: {
    basket() {
      return this.$store.getters['basket/getBasket'];
    },
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
  .basket-page-wrapper{
    @include row-flex();
    .basket-block{
      @include col();
      @include size(9);
    }
    .total-block{
      @include col();
      @include size(3);
      .total-row{
        margin-bottom: 1em;
      }
    }
  }
</style>
