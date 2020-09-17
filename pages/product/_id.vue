<template>
    <div class="content">
      <Breadcrumbs :crumbsItems="crumbsItems"/>
      <div class="product-detail">
        <h1>{{ item.NAME }}</h1>
        <div class="product-content">
          <div class="product-pic">
            <img v-lazy="item.RESIZE_DETAIL_PICTURE.middle.src" v-if="item.RESIZE_DETAIL_PICTURE !=undefined"  alt="">
          </div>
          <div class="product-info">
            <div class="row">
              <span>Цена: {{ item.PRICE ? item.PRICE : 'Не указана' }}</span>
            </div>
            <div class="row offers" v-if="page.offers != undefined && page.offers.length > 0">
              <div>
                <label class="offer-select-label">Торг предложения:</label>
              </div>
              <select v-model="selectedOffer">
                <option
                 v-for="offer in page.offers"
                 :value="offer"
                 :key="offer.ID">{{ offer.NAME }}</option>
              </select>
            </div>
            <div class="to-basket-row">
              <ToBasketBtn :item="item"/>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import ToBasketBtn from '~/components/basket/ToBasketBtn.vue';
export default {
    async asyncData({ app, params, route, $axios, error }){
      try {
        let { data } = await $axios.get(app.$api(`/catalog-item/${route.params.id}`));
        return { page: data }
      } catch(err) {
        return error ({
          statusCode: err.response.status,
          message: err.response.statusText
        })
      }
  },
  data() {
    return {
      page: {},
      selectedOffer: null,
    }
  },
  head() {
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
    if (this.page.offers != undefined && this.selectedOffer == null) {
      for (let i in this.page.offers) {
        this.selectedOffer = this.page.offers[i]; break;
      }
    }
  },
  components: {
    ToBasketBtn
  },
  computed: {
    item() {
      if (this.selectedOffer == null) {
        return this.page.item;
      } else {
        let item = this.selectedOffer;
        return item;
      }
    },
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
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .product-content{
    display: flex;
  }
  .product-pic{
    width: 50%;
    height: 400px;
    img{
      max-width: 100%;
    }
  }
  .product-info{
    width: 50%;
  }
  .offer-select-label{
    margin-bottom: 0.3;
  }
  .row{
    margin-bottom: 1em;
  }
</style>