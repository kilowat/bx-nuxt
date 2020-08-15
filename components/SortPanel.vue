<template>
  <div class=sort-panel>
    <div v-for="item in sortData" :key="item.id">
      <label>{{ item.name }}</label>
      <input type="radio" v-model="order" name="order" @change="sort" :value="item.param+'_asc'">asc
      <input type="radio" v-model="order" name="order" @change="sort" :value="item.param+'_desc'">desc
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

</style>