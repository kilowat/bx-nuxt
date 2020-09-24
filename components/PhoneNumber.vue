<template>
  <div class="phone-number" v-if="info.PHONE">
    <CallSvg class="icon" />
    <a :href="'tel:' + cleanPhone" title="Номер телефона"></a>{{ phone }}</div>
</template>
<script>
import CallSvg from '~/assets/svg/call.svg';

export default {
  components: {
    CallSvg
  },
  computed:{
    info() {
      return this.$store.getters['site/info']
    },
    phone() {
      return this.info.PHONE.UF_VALUE;
    },
    cleanPhone() {
      return this.phone.replace(/[^0-9+]/g, '');
    }
  }
}
</script>

<style lang="scss">
.phone-number{
  font-weight: 700;
}
.phone-number {
  display: flex;
  align-items: center;
  .icon{
    margin-right: 5px;
  }
}
</style>