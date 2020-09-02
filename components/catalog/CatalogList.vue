<template>
  <div class="catalog-items" :class="`cols-${cols}`">
    <CatalogItem  v-for="item in items" :key="item.ID" :item="item"/>
  </div>
</template>
<script>
import CatalogItem from '~/components/catalog/CatalogItem.vue';

export default {
  props: {
    items: {
      type: Array
    },
    cols: {
      type: Number,
      default: 3,
    }
  },
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
  }
  &.cols-3{
    .catalog-item{
      @include size(4);
      @include size-md(6);
      @include size-xs(12);
    }
  }
  &.cols-4{
    .catalog-item{
      @include size(3);
      @include size-md(6);
      @include size-xs(12);
    }
  }
}
</style>