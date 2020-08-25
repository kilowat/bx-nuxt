<template>
  <div class="loader-icon" v-show="active" ref="item">
    <Spiner />
  </div>
</template>

<script>
import Spiner from '~~/assets/svg/spiner.svg';
export default {
  props: ['active', 'fade'],
  watch:{
    active(val) {
      if (this.fade && this.$refs.item.parentNode != undefined && val) {
        this.$refs.item.parentNode.classList.add("fade");
      } else if(this.$refs.item.parentNode != undefined && !val) {
        this.$refs.item.parentNode.classList.remove("fade");
      }
    }
  },
  mounted() {
    this.$nextTick( ()=> {
      if( this.fade && this.$refs.item.parentNode != undefined && this.active) {
        this.$refs.item.parentNode.classList.add("fade");
      }
    });
  },
  components:{
    Spiner
  },
}
</script>
<style lang="scss">
.loader-icon {
  position: absolute;
  width: 64px;
  height: 64px;
  left: calc(50% - 32px);
  top: calc(50% - 32px);
  svg{
    background: transparent!important;
  }
}
.fade{
  opacity: 0.3;
  transition: all 0.2s;
}
</style>