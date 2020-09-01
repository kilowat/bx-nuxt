<template>
  <div class="content page-content">
    <Breadcrumbs :crumbsItems="crumbsItems"/>
    <div class="auth-component" v-if="!user.isAuthorized">
      <h1>{{ pageName }}</h1>
      <AuthForm  />
    </div>
    <div v-else class="auth">
      <h1>Вы авторизованы</h1>
      <nuxt-link to="/">Перейти на главную</nuxt-link>
    </div>
  </div>

</template>

<script>
import AuthForm from '~/components/auth/AuthForm.vue';
export default {
  head () {
    return {
      title: this.pageName,
    }
  },
  data() {
    return {
    }
  },
  components: {
    AuthForm
  },
  computed: {
    pageName() {
      return "Авторизация";
    },
    user() {
      return this.$store.getters['user/getUser'];
    },
    crumbsItems() {
      return [
        {
          title: this.pageName,
          link: '',
        }
      ]
    },
  }
}
</script>

<style lang="scss">
  .auth-component{
    margin: auto;
    width: 320px;
  }
</style>
