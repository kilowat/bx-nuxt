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
    height: 100px;
    background-color: #f8f8f8;
    .menu-block ul{
      list-style: none;
      margin: 0;
      padding: 0;
      li{
        margin-bottom: 10px;
      }
    }
  }
</style>