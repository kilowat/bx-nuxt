<template>
  <div class="auth">
    <div class="auth-row">
      <input type="text" v-model="login" placeholder="Логин">
    </div>
    <div class="auth-row">
      <input type="password" v-model="password" placeholder="Пароль">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: null,
      password: null,
    }
  }
}
</script>