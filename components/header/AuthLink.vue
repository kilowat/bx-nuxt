<template>
  <client-only>
    <div class="current-user">
      <div v-if="user.isAuthorized" class="user">
        {{ userName }}
      </div>
      <div v-else>
        <nuxt-link :to="{ name: 'login' }">Авторизоваться</nuxt-link>
      </div> 
    </div>
  </client-only>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.getters['user/getUser'];
    },
    userName() {
      if (this.user.FULL_NAME != undefined)
        return this.user.FULL_NAME;
      else
        return this.user.LOGIN;
    }
  }
}
</script>