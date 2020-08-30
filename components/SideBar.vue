<template>
    <aside class="sidebar">
      <slot></slot>
    </aside>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
  .flex-wrapper-sidebar > .content{
    width: calc(100% - 275px);
  }
  .sidebar{
    width: 250px;
    margin-right: 25px;
  }
</style>