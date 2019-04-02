const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans' },
      // { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css', integrity: 'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr', crossorigin: 'anonymous' }
    ],
    // script: [],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/bootstrap-grid.min.css',
    '~/assets/css/bootstrap-reboot.min.css',
    '~/assets/css/bootstrap.min.css',
    '~/assets/fonts/all.css',
    {
      src: '@/assets/css/main.scss',
      lang: 'sass'
    },
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/vue2-editor', ssr: false },
    { src: '@/plugins/vue-js-modal', ssr: false },
    { src: '@/plugins/vue-switches', ssr: false }
    // { src: '@/components/ui/Field', ssr: false }
    // {src: '~/plugins/tiny', ssr: false}
  ],

  sassResources: [
    '@/assets/css/main.scss'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'nuxt-sass-resources-loader'
  ],

  axios: {
    baseURL: process.env.BASE_URL,
    proxy: process.env.PROXY || false
    // See https://github.com/nuxt-community/axios-module#options
  },

  proxy: {
    '/api/**': process.env.API_URL,
    // '/media/**': process.env.API_URL,
    // '/users/**': process.env.API_URL
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extractCSS: true,
    extend(config, ctx) {
      // config.module.rules.push({})
    }
  }
}
