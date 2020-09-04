<template>
  <div class="content page-content">
    <notifications group="order" position="top center"/>
    <Breadcrumbs :crumbsItems="crumbsItems"/>
    <h1>Оформить заказ</h1>
    <div class="order-wrapper">
      <Loading :active="this.loading" fade="true"/>
      <div class="order" v-if="order">
        <div class="sections-block">
          
          <!--start basket-->
          <div class="order-section basket-section">
            <div class="section-name">Состав заказа</div>
            <Basket @on-after-update="setOrderData"/>
          </div>
          <!--end basket-->

          <!--start person types-->
          <div class="order-section person-types">
            <div class="section-name">Тип платильщик</div>
            <div class="person-list">
              <div class="person-item" 
                v-for="item in order.PERSON_TYPES" :key="item.ID">
                <input 
                  :id="`person-${item.ID}`" 
                  type="radio" name="person-type" 
                  :value="item.ID"
                  @change="setOrderData"
                  v-model="personType">
                <label :for="`person-${item.ID}`">{{ item.NAME }}</label>
              </div>
            </div>
          </div>
          <!--end person types-->

          <!--start city-->
          <div class="order-section city">
            <div class="section-name">Город</div>
            <div class="city-select">
              <div class="form-control"
                :class="{ invalid : validFields.LOCATION != undefined }">
                <v-select
                  label="NAME"
                  :value="currentCityName"
                  :clearable="false"
                  :options="cityList"
                  @input="setLocation"
                  @search="onSearchCity"
                  placeholder="Выверите ваш город">
                  <template #no-options="{ search, searching, loading }">
                      <span v-if="search.lenght > 0">{{ search }} не найден</span>
                      <span v-else>Введите город</span>
                  </template>
                </v-select>
                <span class="error-msg">{{ validFields.LOCATION ? validFields.LOCATION: '' }}</span>
              </div>
            </div>
          </div>
          <!--end city-->

          <!--start user props-->
          <div class="order-section user-props">
            <div class="section-name">Данные покупателя</div>
            <div class="user-prop-list">
              <div class="user-prop-item" v-for="prop in this.props" :key="prop.ID">
                <div class="form-control"
                  v-show="inputType(prop) !== 'hidden'"
                  :class="[
                    { invalid : validFields[prop.CODE] != undefined }, 
                    { required: prop.REQUIRED == 'Y' } ]">
                  <input 
                    :type="inputType(prop)"
                    class="input text-input"
                    v-model="userProps[prop.CODE]"
                    :placeholder="prop.NAME">
                  <span class="error-msg">{{ validFields[prop.CODE] ? validFields[prop.CODE] : '' }}</span>
                </div>
              </div>
              <div class="user-prop-item">
                <div class="form-control">
                  <textarea name="" class="text-area" id="" cols="30" rows="10" v-model="comment" placeholder="Комментарий"></textarea>
                </div>
              </div>
            </div>
          </div>
          <!--end user props-->

          <!--start payment and delivery-->
          <div class="order-section services-block">
            <h3>Доставка и оплата</h3>
            
            <div class="services-section delivery-section">
              <div class="service-section-name">Доставка</div>
              <div class="service-list">
                <label  
                  v-for="delivery in order.DELIVERIES"
                  :key="delivery.ID"
                  :for="'deliver-'+delivery.ID"
                  :class="{selected : delivery.SELECTED}"
                  class="service-item">
                    <div class="service-icon">
                        <span role="img" :style="{ backgroundImage: `url('${delivery.LOGO}')` }"></span>
                    </div>
                    <div class="service-name">{{ delivery.NAME }}</div>
                    <div class="service-descr">{{ delivery.DESCRIPTION }}</div>
                    <div class="service-price">
                      <span v-if="delivery.PRICE">{{ delivery.PRICE }}</span>
                      <span v-else>Рассчитать</span>
                    </div>
                    <input type="radio"
                      @change="setOrderData"
                      :value="delivery.ID"
                      v-model="deliveryId"
                      :disabled="loading"
                      class="service-radio"
                      :checked="delivery.SELECTED"
                      :id="'deliver-'+delivery.ID"
                      name="delivery_id">
                </label>
              </div>
            </div>

            <div class="services-section payment-section">
              <div class="service-section-name">Оплата</div>
              <div class="service-list">
                  <label  
                    v-for="payment in order.PAYMENTS"
                    :key="payment.ID"
                    :for="'payment-'+payment.ID"
                    :class="{selected : payment.SELECTED}"
                    class="service-item">
                      <div class="service-icon">
                          <span role="img" :style="{ backgroundImage: `url('${payment.LOGO}')` }"></span>
                      </div>
                      <div class="service-name">{{ payment.NAME }}</div>
                      <div class="service-descr">{{ payment.DESCRIPTION }}</div>
                      <input type="radio"
                        @change="setOrderData"
                        :value="payment.ID"
                        v-model="paymentId"
                        class="service-radio"
                        :disabled="loading"
                        :checked="payment.SELECTED"
                        :id="'payment-'+payment.ID"
                        name="payment_id">
                  </label>
              </div>
            </div>
          </div>
          <!--end payment and delivery-->
        </div>
        <div class="total-block">
          <div class="total-wrapper">
            <div class="total-row">
              Итого: {{ order.PRICE_ORDER }}
            </div>
            <div class="total-row">
              <button @click="saveOrder">Оформить заказ</button>
            </div> 
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import Basket from '~/components/basket/Basket.vue';

export default {
  head () {
    return {
      title: 'Оформления заказа',
    }
  },
  data() {
    return {
      personType: null,
      loading: true,
      order: null,
      userProps: {},
      comment: "",
      currentCityName: "",
      deliveryId : 0,
      paymentId: 0,
      cityList: [],
      showProps: [
        "FIO",
        "PHONE",
        "EMAIL",
        "ADDRESS",
        "INDEX",
      ],
      validFields:{}
    }
  },
  mounted() {
    this.getDataFromServer();
  },
  components: {
    Basket
  },
  watch:{
    order(val){
      for (let i in val.PROPS) {
        if (this.userProps[i] == undefined) {
            this.userProps[i] = val.PROPS[i].VALUE;
        }
      }
      this.personType = val.PERSON_TYPE_SELECTED_ID;
      this.currentCityName = val.CURRENT_CITY_NAME;
      this.deliveryId = val.DELIVERY_SELECTED_ID;
      this.paymentId = val.PAYMENT_SELECTED_ID;
     
      if (val.PROPS.LOCATION != undefined) {
        this.currentCityCode = val.PROPS.LOCATION.VALUE;
      }
    },
  },
  computed: {
    crumbsItems() {
      return [
        {
          title: 'Заказ',
          link: '',
        }
      ]
    },
    props() {
      let props = {};
      /*
      let showProps = this.showProps;
      for (let i in showProps) {
        if (this.order.PROPS[showProps[i]] != undefined) {
          props[showProps[i]] = this.order.PROPS[showProps[i]];
        }
      }
      */
      props = this.order.PROPS
      return props;
    },
    orderData() {
      let orderData = {
        PERSON_TYPE_ID: this.personType,
        DELIVERY_ID: this.deliveryId,
        PAYMENT_ID: this.paymentId,
        USER_PROPS: this.userProps,
        LOCATION: this.currentCityCode,
      };

      return orderData;
    }
  },
  methods: {
    async getDataFromServer() {
      try {
        this.loading = true;
        let { data } = await this.$axios.get(this.$api('order/getData'));
        this.order = data.order;
      } catch(e) {
        console.log(e);
      } finally {
          this.loading = false;
      }
    },
    async setOrderData() {
      try {
        this.loading = true;
        let { data } = await this.$axios.post(this.$api('order/setData'), this.orderData);
        this.order = data.order;
      } catch(e) {
        console.log(e);
      } finally {
          this.loading = false;
      }
    },
    async saveOrder() {
      try {
        this.loading = true;
        let { data } = await this.$axios.post(this.$api('order/save'), this.orderData);
        if (data.order.ID == undefined && Object.keys(data.order.ORDER_ERROR).length > 0) {
          this.handleOrderError(data);
        } else {
          console.log("Order created! " + data.order.ID);
          this.$store.commit('basket/setBasket', {});
          await this.$store.dispatch('user/fetchUser'); //Обновить пользователя, на случай если это новый
          this.$router.push(`/order/${data.order.ID}`);
        }
      } catch(e) {
        console.log(e);
      } finally {
        this.loading = false;
      }      
    },
    setLocation(val) {
      this.currentCityCode = val.CODE;
      console.log(this.currentCityCode);
      this.setOrderData();
    },
    async onSearchCity(search, loading) {
      loading(true);
      this.searchCity(loading, search, this);
    },
    async searchCity(loading, search, vm) {
        let {data} = await this.$axios.post(this.$api('order/getCity'), {search: search})
        this.cityList = data;
        loading(false);
    },
    handleOrderError(data) {
      if (data.errors.TYPE == "field_valid") {
        this.validFields = data.order.ORDER_ERROR;
        let msg = data.errors.MSG;
        if (data.order.ORDER_ERROR.DELIVERY != undefined) {
          msg = data.order.ORDER_ERROR.DELIVERY;
        }
        if (data.order.ORDER_ERROR.PAYMENT != undefined) {
          msg = data.order.ORDER_ERROR.PAYMENT;
        }
        this.$nuxt.$emit(this.$eventMap.onOrderInvalidFields,  { msg: msg, fields: data.order.ORDER_ERROR });
      } else {
        throw (data.errors.MSG);
      }
    },
    inputType(prop) {
      if (prop.UTIL == "Y")
        return "hidden";
      else if (prop.CODE == "PHONE")
        return "tel";
      else 
        return "text";
    }
  }
}
</script>

<style lang="scss">
  .order{
    @include row-flex();
    .user-prop-list{
      .user-prop-item{
        margin-bottom: 1em;
      }
    }
    .sections-block{
      @include col();
      @include size(9);
    }
    .total-block{
      @include col();
      @include size(3);
      .total-row{
        margin-bottom: 1em;
      }
    }
    .order-section{
      margin-bottom: 20px;
      .section-name{
        font-weight: 700;
        font-size: 1.5em;
        margin-bottom: 1.2em;
      }
    }
    .services-block{
      h3{
        font-size: 1.5;
        margin-bottom: 0.5em;
      }
      .services-section{
        margin-bottom: 20px;
      }
      .service-section-name{
        font-weight: 700;
        margin-bottom: 1.2em;
      }
    }
    .service-list{
      @include row-flex();
      .service-item{
        @include col();
        @include size(4);
        border: 1px solid #ccc;
        padding: 10px;
        cursor: pointer;
        &.selected{
          border-color: $color-primary;
        }
        .service-icon{
          text-align: center;
           span{
            width: 100px;
            height: 100px;
            display: inline-block;
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }
    }
  }
</style>