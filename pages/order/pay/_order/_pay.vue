<template>
  <div class="content page-content">
    <div class="pay">
      <Loading :active="loading" />
      <div class="pay-container" v-if="payment">
       
      </div>
    </div>
  </div>

</template>

<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import Loading from '~/components/Loading.vue';

export default {
  layout: "payment",
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
    Breadcrumbs,
    Loading
  },
  mounted(){
    this.getDataFromServer();
  },
  computed: {
    pageName() {
      return "Оплата заказа";
    },
    payment() {
      if (this.order != undefined && this.order.PAY_SYSTEM_LIST[this.payId] != undefined)
        return this.order.PAY_SYSTEM_LIST[this.payId];
      else
        return false;
    },
    orderId() {
      return this.$route.params.order;
    },
    payId() {
      return this.$route.params.pay;
    }
  },
  methods: {
    async getDataFromServer() {
      try {
        this.loading = true;
        let { data } =  await this.$axios.get(this.$api(`order/id/${this.orderId}`));
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
