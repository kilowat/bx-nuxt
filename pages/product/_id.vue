<template>
    <div class="content">
      <Breadcrumbs :crumbsItems="crumbsItems"/>
      <div class="product-detail">
        <h1>{{ page.item.NAME }}</h1>
      </div>
    </div>
</template>
<script>

export default {
    async asyncData({ app, params, route, $axios, error }){
      try{
        let { data } = await $axios.get(app.$api(`/catalog-item/${route.params.id}`));
        return { page: data }
      }catch(e){
        console.log(e);
      }
  },
  data() {
    return {
      page: {}
    }
  },
  head () {
    return {
      title: this.page.item.SECTION_META_TITLE,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.item.SECTION_META_DESCRIPTION
        }
      ],
    }
  },
  components: {
   
  },
  computed:{
    crumbsItems() {
      return [
        { 
          title: this.page.section.NAME,
          link: '/catalog/' + this.page.section.CODE,
        },
        {
          title: this.page.item.NAME,
          link: '',
        }
      ]
    },
  }
}
</script>
<style lang="scss" scoped>

</style>