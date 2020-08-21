<template>
  <ul class="page-menu">
    <li v-for="item in items" :key="item.ID">
      <nuxt-link v-if="item.CODE == 'index'" :to="'/'" :title="item.NAME">{{ item.NAME }}</nuxt-link>
      <nuxt-link v-else :to="`/${item.CODE}`" :title="item.NAME">{{ item.NAME }}</nuxt-link>
    </li>
  </ul>
</template>
<script>
export default {
  computed: {
    items() {
      return this.$store.getters['pages/list'];
    }
  }  
}
</script>
<style lang="sass" scoped>

</style>