const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()

module.exports = {
  srcDir: 'src',
  head: {
    title: 'qiilog',
    meta: [
      { chatset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: 'とりあえずやってみたらハマってBLOGの記事になるやろ' },
      { hid: 'og:url', property: 'og:url', content: 'https://' + process.env.HOSTNAME },
      { hid: 'og:title', property: 'og:title', content: 'とりあえずやってみる' },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      { hid: 'og:description', property: 'og:description', content: 'とりあえずやってみたらハマってBLOGの記事になるやろ' },
      { hid: 'og:image', property: 'og:image', content: 'https://' + process.env.HOSTNAME + '/static/big_image.jpeg' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'とりあえずやってみる' },
      { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@k_aik_ou' },
      { hid: 'format-detection', name: 'format-detection', content: 'email=no,telephone=no,address=no' },
      { hid: 'robots', name: 'robots', content: process.env.META_ROBOTS_CONTENT },
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
    'nuxt-user-agent',
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
    swDest: 'static/sw.js',
  },
}
