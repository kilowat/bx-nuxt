<template>
    <div class="content">
      <Breadcrumbs :crumbsItems="crumbsItems"/>
      <div class="product-detail">
        <h1>{{ page.item.NAME }}</h1>
        <div class="product-content">
          <div class="product-pic">
            <img v-lazy="page.item.RESIZE_DETAIL_PICTURE.middle.src" v-if="page.item.RESIZE_DETAIL_PICTURE !=undefined"  alt="">
          </div>
        </div>
      </div>
    </div>
</template>
<script>

export default {
    async asyncData({ app, params, route, $axios, error }){
      try{
        let { data } = await $axios.get(app.$api(`/catalog-item/${route.params.id}`));
        return { page: data }
      }catch(err){
        return error({
          statusCode: err.response.status,
          message: err.response.statusText
        })
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
  mounted() {
    console.log(this.page.item);
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