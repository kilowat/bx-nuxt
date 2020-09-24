<template>
  <div class="page">
    <HeaderBlock />
    <main class="container">
      <nuxt /> 
      <Notice /> 
    </main>
    <FooterBlock />
  </div>
</template>

<script>
import HeaderBlock from '~/components/header/HeaderBlock.vue';
import FooterBlock from '~/components/footer/FooterBlock.vue';
import Notice from '~/components/Notice.vue';

export default {
  computed: {
    meta() {
      return [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1 shrink-to-fit=no'
        },
        { hid: 'description', name: 'description', content: '' }
      ]
    },
  },
  head() {
    return {
      meta: [
        ...this.meta

      ],
      script: [
        // { src: 'https://markknol.github.io/console-log-viewer/console-log-viewer.js' }
      ],
    }
  },
  components: {
    HeaderBlock,
    FooterBlock,
    Notice
  }
}
</script>

<style lang="scss">

.page-enter-active,
.page-leave-active,
.layout-enter-active, 
.layout-leave-active {
  //transition: opacity .2s
}

.page-enter,
.page-leave-active,
.layout-enter, 
.layout-leave-active {
  opacity: 0
}

.container{
  width: 100%;
  @include wrapper();
}
html{
  font-size: $font-size;
  font-family: $font-open-sans;
  line-height: $base-line-height;
  color: $color-text;
}

@font-face {
  font-family: 'als_rublregular';
  font-weight: normal;
  src: url('~assets/fonts/ruble/rouble-webfont.eot') format('eot'); /* IE9 Compat Mode */
  src: url('~assets/fonts/ruble/rouble-webfont.woff') format('woff'),
       url('~assets/fonts/ruble/rouble-webfont.ttf') format('ttf');
}

.ruble-symbol{
  font-family: als_rublregular;
}
main{
  flex-grow: 1;
  padding-bottom: 15px;
}
.page{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.flex-wrapper-sidebar {
    display: flex;
    flex-wrap: wrap;
}

.content{
  flex-grow: 1;
}
.text-center{
  text-align: center;
}
p{
  margin-bottom: 1em;
}
h1, h2, h3{
  margin-top: 1.3em;
  margin-bottom: 1em;
}
h1{
  font-size: 28px;
  &.row-title{
    font-size: 28px;
  }
}
h2{
  font-size: 22px;
  &.row-title{
    font-size: 28px;
  }
}
</style>
