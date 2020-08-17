<template>
  <div class="breadcrumbs">
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <span v-if="index +1 == items.length && items.length > 1">{{ item.title }}</span>
        <nuxt-link v-else :to="item.link">{{ item.title }}</nuxt-link>
        <span class="sep" v-if="index + 1 < items.length">/</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    crumbsItems:{
      type: Array,
      default: [],
    }
  },
  data() {
    return {
      itemsDefault: [
        {
          title :"Главная",
          link : "/",
        }
      ]
    }
  },
  mounted() {
   
  },
  computed: {
    items() {
      return this.itemsDefault.concat(this.crumbsItems);
    }
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumbs{
    margin-bottom: 1em;
    ul{
      list-style: none;
      margin: 0;
      padding: 0;
      li{
        display: inline-block;
        margin-left: 4px;
        &:first-child{
          margin-left: 0px;
        }
      }
    }
  }
</style>