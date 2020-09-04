<template>
  <div>
    <notifications group="global" position="top center"/>
    <notifications group="buyed" width="420" position="top center"> 
      <template slot="body" slot-scope="props">
        <div class="box-msg">
          <a class="close" @click="props.close"><Close /></a>
          <div class="box-header">Товар добавлен в корзину</div>
          <div class="box-body">
            <div class="product-wrapper">
              <div class="pic-cell" v-if="props.item.data.PICTURE != undefined">
                <span class="pic" role="img" :style="{ backgroundImage: `url('${props.item.data.PICTURE}')` }" ></span>
              </div>
              <div class="product-content">
                <span class="name">{{ props.item.data.NAME }}</span>
                <span class="quantity">{{ props.item.data.QUANTITY }} шт</span>  
              </div>
            </div>
          </div>
          <div class="box-footer">
            <nuxt-link to="/order" @click.native="props.close" class="btn btn-primary">Перейти в корзину</nuxt-link>
            <button class="btn btn-grey" @click="props.close">Продолжить покупки</button>
          </div>
        </div>
      </template>
    </notifications>    
  </div>
</template>
<script>
import Close from "~/assets/svg/close.svg";
export default {
  data(){
    return {
    }
  },
  components: {
    Close
  },
  mounted(){
    for (let i in this.$eventMap) {
      if (this[i] != undefined && typeof this[i] === "function") {
        this.$nuxt.$on(this.$eventMap[i], this[i]);
      }
    }
  },
  methods:{
    onProductAddedToBasket(product) {
      this.$notify({
        group: 'buyed',
        type: 'box',
        title: 'Покупка',
        duration: 1000000,
        data: product,
      });
    },
    onUserLogin() {
      this.$notify({
        group: 'auth',
        type: 'success',
        title: 'Авторизация',
        text: "Вы успешно авторизованы"
      });
    },
    onUserErrorLogin(msg) {
      this.$notify({
        group: 'auth',
        type: 'error',
        title: 'Ошибка авторизации',
        text: msg
      });
    },
    onOrderInvalidFields(props) {
      this.$notify({
        group: 'order',
        type: 'error',
        title: 'Ошибка оформления заказ',
        text: props.msg,
        duration: 10000,
      }); 
    }
  }
}
</script>
<style lang="scss">
.vue-notification {
  padding: 10px;
  margin: 0 5px 5px;
 
  font-size: 14px;
 
  color: #ffffff;
  background: #44A4FC;
  border-left: 5px solid #187FE7;
  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }
 
  &.error {
    background: #E54D42;
    border-left-color: #B82E24;
  }
 
  &.success {
    background: #68CD86;
    border-left-color: #42A85F;
  }

}
.vue-notification-wrapper {
  .box-msg{
    background: #fff;
    border-left: 0;
    box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.4);
    margin: 2px;
    position: relative;
    color: #000;
    .close{
      position: absolute;
      right: 8px;
      top: 0px;
      font-size: 22px;
      background-color: #fff;
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    .box-header{
      padding-left: 1em;
      padding-right: 1em;
      margin-bottom: 0.4em;
      padding-top: 0.5em;
      font-weight: 700;
    }
    .box-body{
      padding-left: 1em;
      padding-right: 1em;
    }
    .box-footer{
      display: flex;
      background-color: #f8f8f8;
      border-top: 1px solid #ccc;
      margin-top: 1em;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
      .btn{
        margin: 10px;
        height: 28px;
        font-size: 14px;
        font-weight: 400;
        padding: 0px;
      }
    }
  }
  .product-wrapper{
    display: flex;
    .pic-cell{
      margin-right: 8px;
      .pic{
        width: 80px;
        height: 80px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        display: block;
      }
    }
    .quantity{
      font-weight: 700;
    }
  }
}
</style>