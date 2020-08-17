<template>
  <div>
    <HeaderBlock />
    <main class="wrapper">
        <nuxt />
    </main>
  </div>
</template>

<script>
import HeaderBlock from '~~/components/Header/HeaderBlock';

export default {
  computed: {
    meta() {
      return [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1 shrink-to-fit=no'
        },
        { hid: 'description', name: 'description', content: 'Главная' }
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
.wrapper{
  @include globalWrapper();
}
html{
  font-size: $font-size;
  font-family: $font-open-sans;
  line-height: $base-line-height;
}
.ruble{
  font-family: als_rublregular;
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
</style>
