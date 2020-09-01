<template>
  <div class="loader-icon" v-show="active" ref="item">
    <Spiner />
  </div>
</template>

<script>
import Spiner from '~~/assets/svg/spiner.svg';
export default {
  props: ['active', 'fade', 'wrapper'],
  watch:{
    active(val) {
      let wrapper;
      if (this.wrapper !=undefined ){
        wrapper = document.querySelector(this.wrapper);
       
      } else if (this.$refs.item != undefined) {
        wrapper = this.$refs.item.parentNode;
      }

      if (this.fade && wrapper != undefined && val) {
        wrapper.classList.add("fade");
      } else if(wrapper != undefined && !val) {
        wrapper.classList.remove("fade");
      }
    }
  },
  mounted() {
    this.$nextTick( () => {
      let wrapper;
      if (this.wrapper !=undefined ){
        wrapper = document.querySelector(this.wrapper);
      } else if (this.$refs.item != undefined) {
        wrapper = this.$refs.item.parentNode;
      }
      if( this.fade && wrapper != undefined && this.active) {
        wrapper.classList.add("fade");
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
  position: fixed;
  width: 64px;
  height: 64px;
  left: calc(50% - 32px);
  top: calc(50% - 32px);
  svg{
    background: transparent!important;
  }
}
.fade{
  position: relative;
  &:before{
    background-color: #fff;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    opacity: 0.6;
    content: "";
    display: block;
    transition: all 0.2s;
  }
}
</style>