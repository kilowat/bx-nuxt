const imageminMozjpeg = require('imagemin-mozjpeg')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: 'universal',
  ...(!isDev && {
    modern: 'client'
  }),

  head: {
    htmlAttrs: {
      lang: 'ru'
    },
    titleTemplate: '%s - Префикс в title',
    meta: [
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'shortcut icon', href: '/favicon.ico' }
    ]
  },
  rootDir: __dirname,
  serverMiddleware: [
  ],
  router: {
    prefetchLinks: false,
    trailingSlash: false,
  },
  loading: { color: '#ddd' },
  css: [
    'normalize.css',
    '~/assets/scss/inputs/_module.scss',
  ],
  plugins: [
    '~/plugins/utils.js',
    '~/plugins/global.client.js',
    '~/plugins/global.js',
    '~/plugins/vue-lazy-load.js',
    '~/plugins/swiper.js',
  ],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-webfontloader',
    'cookie-universal-nuxt',
    '@nuxtjs/style-resources',
    '@nuxtjs/redirect-module',
    'nuxt-trailingslash-module',
    '@nuxtjs/router',
    '@nuxtjs/proxy'
  ],
  redirect: [
    //{ from: '^(\\/[^\\?]*[^\\/])(\\?.*)?$', to: '$1/$2', },
    { from: '/index/', to: '/', }
  ],
  routerModule: {
    keepDefaultRouter: true,
  },
  /*
  webfontloader: {
    events: false,
    google: {
      families: ['Open Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap'] //Loads Lato font with weights 400 and 700
    },
    timeout: 5000
  },
  */
  styleResources: {
    scss: [
      '~/assets/scss/global-variables.scss',
      'breakpoint-sass/stylesheets/_breakpoint.scss',
      '~/assets/scss/smart-grid.scss',

    ], // alternative: scss
    less: [],
    stylus: []
  },
  /*
  ** Axios module configuration
  */
  axios: {
    //browserBaseURL: 'http://dev.local',
    proxy: true,
    // See https://github.com/nuxt-community/axios-module#options
  },
  proxy: {
    '/api': { target: 'http://192.168.1.48', changeOrigin: true },
    '/upload': { target: 'http://192.168.1.48', changeOrigin: true },
  },
  render: {
    // http2: {
    //     push: true,
    //     pushAssets: (req, res, publicPath, preloadFiles) => preloadFiles
    //     .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
    //   },
    // compressor: false,
    resourceHints: false,
    etag: false,
    static: {
      etag: false
    }
  },
  /*
  ** Build configuration
  */
  build: {
    optimizeCss: false,
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },
    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true
        }
      }
    }),
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    optimization: {
      minimize: !isDev
    },
    ...(!isDev && {
      extractCSS: {
        ignoreOrder: true
      }
    }),
    transpile: ['vue-lazy-hydration', 'intersection-observer'],
    postcss: {
      plugins: {
        ...(!isDev && {
          cssnano: {
            preset: ['advanced', {
              autoprefixer: false,
              cssDeclarationSorter: false,
              zindex: false,
              discardComments: {
                removeAll: true
              }
            }]
          }
        })
      },
      ...(!isDev && {
        preset: {
          browsers: 'cover 99.5%',
          autoprefixer: true
        }
      }),

      order: 'cssnanoLast'
    },
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