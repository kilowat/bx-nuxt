<template>
  <div class="content page-content">
    <Breadcrumbs :crumbsItems="crumbsItems"/>
    <h1>{{ pageName }}</h1>
    <div class="order">
      <Loading :active="loading" />
      <div class="order-info" v-if="order != null">
        <div class="order-row date">От {{ order.DATE }}</div>
        <div class="order-row pay-system">
          <div class="pay-item" v-for="payment in order.PAYMENT" :key="payment.ID">
            <div class="pay-name">{{ payment.PAY_SYSTEM_NAME }}</div>
            <div class="pay-link" v-if="payment.PAID == 'N' && order.PAY_SYSTEM_LIST[payment.PAY_SYSTEM_ID].IS_CASH !='Y'">
              <a href="#" v-if="order.PAY_SYSTEM_LIST[payment.PAY_SYSTEM_ID].ACTION_FILE == 'bill'">Скачать счет</a>
              <nuxt-link v-else :to="`/order/pay/${order.ORDER_ID}/${payment.PAY_SYSTEM_ID}`">Оплатить</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
    data() {
    return {
      loading: true,
      order: null,
    }
  },
  head () {
    return {
      title: this.pageName,
    }
  },
  components: {
  },
  mounted(){
    this.getDataFromServer();
  },
  computed: {
    pageName() {
      if (this.order != null)
        return "Заказ № " + this.order.ORDER_ID;
      else 
        return "Заказ";
    },
    crumbsItems() {
      return [
        {
          title: this.pageName,
          link: '',
        }
      ]
    },
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    async getDataFromServer() {
      try {
        this.loading = true;
        let { data } =  await this.$axios.get(this.$api(`order/id/${this.id}`));
        this.order = data;
      } catch(e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style>

</style>
