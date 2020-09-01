<template>
    <div class="catalog-items">
      <CatalogItem  v-for="item in items" :key="item.ID" :item="item"/>
    </div>
</template>
<script>
import CatalogItem from '~/components/catalog/CatalogItem.vue';

export default {
  props:["items"],
  components: {
    CatalogItem
  }  
}
</script>
<style lang="scss" scoped>
  .catalog-items{
    @include row-flex();
    @include md(justify-content, center);
    .catalog-item{
      @include col();
      @include size(4);
      @include size-md(5);
      @include size-xs(10);
    }
}
</style>