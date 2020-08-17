
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#f11516' },
  router: {
    prefetchLinks: false
  },
  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    '~/assets/scss/inputs/_module.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/utils.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
    '@nuxtjs/redirect-module'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  redirect: [
    { from: '^(\\/[^\\?]*[^\\/])(\\?.*)?$', to: '$1/$2', }
  ],
  styleResources: {
    scss: [
      '~/assets/scss/global-variables.scss',
      'breakpoint-sass/stylesheets/_breakpoint.scss',

    ], // alternative: scss
    less: [],
    stylus: []
  },
  webfontloader: {
    google: {
      families: ['Open Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap'] //Loads Lato font with weights 400 and 700
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));

      svgRule.test = /\.(png|jpe?g|gif|webp)$/;

      config.module.rules.push({
        test: /\.svg$/,
        use: [
          'babel-loader',
          'vue-svg-loader',
        ],
      });
    }
  }
}
