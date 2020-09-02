<template>
  <div class="content page-content">
    <Loading :active="loading"/>
    <Breadcrumbs :crumbsItems="crumbsItems"/>
    <div class="auth-component" v-if="!user.isAuthorized">
      <h1>{{ pageName }}</h1>
      <AuthForm  />
    </div>
    <div v-else class="auth-component">
      <h1>Вы авторизованы</h1>
      <div class="row">
        <nuxt-link to="/">Перейти на главную</nuxt-link>
      </div>
      <div class="row logout-row">
        <button class="btn btn-primary" @click="logout">Выйти</button>
      </div>
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
      loading: false,
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
  },
  methods: {
    async logout() {
      try {
        this.loading = true;
        let { data } = await this.$axios.post(this.$api('auth/logout'));
        this.$store.dispatch('user/fetchUser');
      } catch(e) {
        console.log(e);
      } finally {
         this.loading = false;
      }
    },
  }
}
</script>

<style lang="scss">
  .auth-component{
    margin: auto;
    width: 320px;
    .row{
      margin-bottom: 1em;
    }
  }
</style>
