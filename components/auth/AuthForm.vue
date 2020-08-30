<template>
  <div class="auth">
    <Loading :active="loading"/>
    <div class="input-row">
      <input type="text" v-model="authParam.login" placeholder="Логин">
    </div>
    <div class="input-row">
      <input type="password" v-model="authParam.password" placeholder="Пароль">
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
      <button @click="login">Login</button>
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
        console.log(data);
      } catch(e) {
        console.log(e);
      } finally {
         this.loading = false;
      }
    }
  }
}
</script>