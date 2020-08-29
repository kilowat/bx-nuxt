<template>
  <div class="content page-content">
    <Breadcrumbs :crumbsItems="crumbsItems"/>
    <h1>{{ pageName }}</h1>
    <AuthForm />
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

<style>

</style>
