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
    const canonical = `https://mysite.com${this.$route.path
      .toLowerCase()
      .replace(/\/$/, '')}`
    return {
      meta: [
        ...this.meta

      ],
      script: [
        // { src: 'https://markknol.github.io/console-log-viewer/console-log-viewer.js' }
      ],
      link: [{ rel: 'canonical', href: canonical }]
    }
  },
  components: {
    HeaderBlock,
  }
}
</script>

<style lang="scss">
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
