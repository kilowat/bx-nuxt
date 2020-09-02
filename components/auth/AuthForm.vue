<template>
  <div class="auth">
    <notifications group="buyed" width="420" position="top center"> 
      <template slot="body" slot-scope="props">
        <div class="box-msg">
          <a class="close" @click="props.close"></a>
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
            <button class="btn btn-primary">Перейти в корзину</button>
            <button class="btn btn-secondary">Продолжить покупки</button>
          </div>
        </div>
      </template>
    </notifications>
    <button @click="test">test</button>
    <Loading :active="loading"/>
    <div class="input-row">
      <input type="text" class="text-input" v-model="authParam.login" placeholder="Логин">
    </div>
    <div class="input-row">
      <input type="password" class="text-input" v-model="authParam.password" placeholder="Пароль">
    </div>
    <div class="input-row">
    <div class="checkbox">
      <input type="checkbox"
        id="remember"
        checked="checked" 
        value="Y"
        v-model="authParam.remember">
      <label for="remember"><span></span>Запоминть</label>
    </div>
    </div>
    <div class="input-row button-row">
      <button @click="login" class="btn btn-primary">Вход</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      authParam: {
        login: null,
        password: null,
        remember: "Y",
      }
    }
  },
  methods: {
    async login() {
      try {
        this.loading = true;
        let { data } = await this.$axios.post(this.$api('auth/login'), this.authParam);
        if (data.TYPE != undefined && data.TYPE == 'ERROR') {
          this.showError(data);
        } else {
          this.showOk();
          this.$store.dispatch('user/fetchUser');
        }

      } catch(e) {
        this.showError(e);
      } finally {
         this.loading = false;
      }
    },
    showError(e) {
      let msg = '';
      if (e.ERROR_TYPE != undefined && e.ERROR_TYPE == 'LOGIN') {
        msg = "Неверный логин или пароль";
      } else if (e.response != undefined) {
        msg = e.response.statusText;
      } else {
        msg = "Произошла ошбика";
      }
      this.$notify({
        group: 'auth',
        type: 'error',
        title: 'Авторизация',
        text: msg
      });
    },
    showOk() {
      this.$notify({
        group: 'auth',
        type: 'success',
        title: 'Авторизация',
        text: "Вы успешно авторизованы"
      });
    },
    test() {
      this.$notify({
        group: 'buyed',
        type: 'box',
        title: 'Покупка',
        duration: 100000,
        data: this.$store.getters['basket/getBasket'].ITEMS[0]
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-row{
    margin-bottom: 1em;
  }
</style>