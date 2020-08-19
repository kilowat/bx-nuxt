<template>
  <div v-if="info.PHONE">{{ info.PHONE.UF_VALUE }}</div>
</template>
<script>
export default {
  computed:{
    info() {
      return this.$store.getters['site/info']
    }
  }
}
</script>