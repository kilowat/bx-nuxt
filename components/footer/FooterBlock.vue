<template>
  <footer class="footer">
    <div class="container">
      <div class="coop-block">

      </div>
      <div class="menu-block">
        <PageMenu />
      </div>
    </div>
  </footer>
</template>
<script>
import PageMenu from '~/components/PageMenu.vue';
export default {
  components: {
    PageMenu
  },
}
</script>
<style lang="scss" scoped>
  .footer{
    height: 150px;
    background-color: #ccc;
  }
</style>