<template>
  <div class="sort-panel">
    <div class="sort-item" v-for="item in sortData" :key="item.id">
      <label>{{ item.name }}</label>
      <input type="radio" v-model="order" name="order" @change="sort" :value="item.radio_values.asc">asc
      <input type="radio" v-model="order" name="order" @change="sort" :value="item.radio_values.desc">desc
    </div>
  </div>
</template>
<script>
export default {
  props: ['sortData'],
  data() {
    return {
      order: '',
    }
  },
  mounted() {
    if (this.$route.query.order != undefined)
      this.order = this.$route.query.order
  },
  methods: {
    sort() {
      this.$emit('onSort', this.order)
    }
  }
}
</script>
<style lang="scss" scoped>
  .sort-panel{
    display: flex;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    .sort-item{
      margin-right: 25px;
    }
  }
</style>