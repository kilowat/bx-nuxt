<template>
  <div class="page">
    <main class="container">
      <nuxt />
    </main>
  </div>
</template>
<script>
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
  @include globalContainer();
}
html{
  font-size: $font-size;
  font-family: $font-open-sans;
  line-height: $base-line-height;
}
.ruble{
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
</style>
