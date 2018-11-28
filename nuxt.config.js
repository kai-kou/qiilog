const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()

module.exports = {
  srcDir: 'src',
  head: {
    title: 'qiilog',
    meta: [
      { chatset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: 'Nuxt Serverless Template' },
      { name: 'robots', content: process.env.META_ROBOTS_CONTENT },
    ],
    link: [
      { rel: 'icon', href: '/static/favicon.ico' },
    ],
  },
  extensions: ['js', 'ts'],
  serverMiddleware: [
    express.json(),
    cookieParser(),
  ],
  css: [
    { src: '~/styles/main.scss', lang: 'scss' },
  ],
  build: {
    extractCSS: true,
    extend(config) {
      const tsLoader = {
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true },
        exclude: [/vendor/, /\.nuxt/],
      }
      config.module.rules.push({
        test: /((client|server)\.js)|(\.tsx?)$/,
        ...tsLoader,
      })
      config.resolve.extensions.push('.ts')
      config.module.rules
        .filter((rule) => rule.loader === 'vue-loader')
        .map((rule) => rule.options.loaders = { ts: tsLoader })
    },
  },
  router: {
    base: ''
  },
  render: {
    etag: false,
  },
  modules: [
    "@nuxtjs/axios",
    '@nuxtjs/vuetify',
    ['@nuxtjs/google-analytics', {
      id: process.env.GOOGLE_ANALYTICS_ID,
    }],
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap',
    '@nuxtjs/pwa',
  ],
  axios: {
    baseURL: process.env.API_RESOURCES_BUCKET_URL + process.env.API_RESOURCES_BUCKET_NAME,
  },
  vuetify: {
    theme: {
    },
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://' + process.env.HOSTNAME,
    cacheTime: 1000 * 60 * 60,
    gzip: true,
    generate: false,
    exclude: [
      'typescript',
      'nuxt',
    ],
    async routes () {
      const axios = require('axios');
      const apiBaseUrl = process.env.API_RESOURCES_BUCKET_URL + process.env.API_RESOURCES_BUCKET_NAME;
      const items = await axios.get(apiBaseUrl + '/items.json');
      let urls = [];
      var routes = items.data.map((item) => {
        return item.id
      });
      return routes;
    }
  },
  manifest: {
    name: process.env.APP_TITLE,
    lang: 'ja',
    start_url: '/',
    icons: [
      {
        src: "static/icon.png",
        sizes: "512x512",
        type: "image/png",
      }
    ]
  },
  workbox: {
    dev: true,
    swDest: 'static/sw.js',
  },
}
