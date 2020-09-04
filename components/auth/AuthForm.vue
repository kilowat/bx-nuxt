<template>
  <div class="auth">
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
    <notifications group="auth" position="center center"/>
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
      this.$nuxt.$emit(this.$eventMap.onUserErrorLogin, msg);
    },
    showOk() {
      this.$nuxt.$emit(this.$eventMap.onUserLogin);
    },
  }
}
</script>

<style lang="scss" scoped>
  .input-row{
    margin-bottom: 1em;
  }
</style>