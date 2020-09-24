<template>
  <span to="#" class="user">
    <nuxt-link to="#" v-if="user.isAuthorized" class="user-link">
      <UserSvg class="icon"/> 
      <span class="scroll-text">
        <span class="user-text" id="marqueeline">{{ userName }}</span>
      </span>
    </nuxt-link>
    <span v-else>
      <nuxt-link :to="{ name: 'login' }">
        <UserSvg class="ico"/>
        <span class="scroll-text">
          <span class="user-text" id="marqueeline">Авторизоваться</span>
        </span>
        </nuxt-link>
    </span> 
  </span>
</template>
<script>
import UserSvg from '~/assets/svg/user.svg';
export default {
  components: {
    UserSvg,
  },
  mounted() {
    this.$nextTick(()=>{
      this.runString();
    });
  },
  computed: {
    user() {
      return this.$store.getters['user/getUser'];
    },
    userName() {
      if (this.user.NAME != undefined) {
        let name = this.user.NAME;
        if (this.user.LAST_NAME != undefined) {
          name = name + " " + this.user.LAST_NAME + ' ';
        }
        return name;
      }
      else {
        return this.user.LOGIN;
      }
    }
  },
  methods: {
    runString(){
      if(window.innerWidth > 980 && document.getElementById('marqueeline') != undefined && document.getElementById('marqueeline').childNodes[0] != undefined){
        setInterval(()=> {
          let node = document.getElementById('marqueeline').childNodes[0];
          let text = node.data;
          text = text.substring(1) + text[0];
          node.data = text;
        }, 350);
      }
    },
  }
}
</script>
<style lang="scss">
.scroll-text {
  width: 100px;
  overflow: hidden;
  display: block;
  .user-text{
    width: 300px;
    display: inline-block;
  }
}
</style>