<template>
  <div class="coupon-insert">
    <Loading :active="loading"/>
    <div class="coupon-input">
      <input type="text" class="text-input" v-model="coupon" placeholder="Введите купон">
    </div>
    <div class="">
      <button @click="set" class="btn btn-grey">Применить</button>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      loading: false,
      coupon: null,
    }
  },
  components: {
  },
  methods: {
    async set() {
      try {
        this.loading = true;
        await this.$store.dispatch('basket/setCoupon', { coupon: this.coupon });
      } catch(e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>