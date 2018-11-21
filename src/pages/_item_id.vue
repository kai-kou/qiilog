<template>
  <v-app light>
    <v-content>
      <v-container>
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="text-xs-center">
              <v-avatar size="125px">
                <img
                  class="img-circle elevation-7 mb-1"
                  src="https://qiita-image-store.s3.amazonaws.com/0/48549/profile-images/1524132209"
                >
              </v-avatar>
              <div class="headline">{{title}}</div>
              <div class="subheading text-xs-center grey--text pt-1 pb-3">I'll try it for the time being</div>
              <v-layout justify-space-between>
                <a href="." class="body-2">Home</a>
                <a href="https://twitter.com/k_aik_ou" target="_blank" class="body-2">twitter</a>
                <a href="https://github.com/kai-kou" target="_blank" class="body-2">Github</a>
                <a href="https://qiita.com/kai_kou" target="_blank" class="body-2">Qiita</a>
              </v-layout>
            </div>
          </v-flex>

          <v-flex xs12>
            <div>
              <v-card class="my-3">
                <v-img
                  class="white--text"
                  src="https://d2l930y2yx77uc.cloudfront.net/production/uploads/images/8544405/wallpaper_landscape_4a50f4bac81212c3140c2af4b913c726.jpg"
                >
                  <v-container fill-height fluid>
                    <v-layout>
                      <v-flex xs12 align-end d-flex>
                        <span class="headline">{{ item.title }}</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
                <v-card-text class="p-items_wrapper">
                  <div class="p-items_main">
                    <div class="p-items_article">
                      <section class="it-MdContent">
                        <div v-html="item.rendered_body"></div>
                      </section>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-flex>

          <v-flex class="list" xs12 v-for="post in items" :key="post.id">
            <v-card class="my-3" hover :href="post.id">
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ post.title }}</div>
                  <span class="grey--text"></span>
                </div>
              </v-card-title>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </v-content>

    <v-footer class="secondary" app>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>
            by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
            and <a class="white--text" href="https://github.com/kai-kou" target="_blank">kai_kou</a>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State } from 'vuex-class'

@Component
export default class PageNuxt extends Vue {
  private head() {
    return {
      title: this.item.title + ' - ' + this.title,
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
        { rel: 'stylesheet', href: 'https://unpkg.com/vuetify/dist/vuetify.min.css' },
        { rel: 'stylesheet', href: 'https://cdn.qiita.com/assets/public-f7955ff83ffb31880bac59d0cd469cbb.min.css' },
      ],
    }
  }

  private async fetch({store, params}) {
    console.log('fetch')
    await store.dispatch('getItem', { item_id: params.item_id })
  }

  private watchQuery() {
    return ['user_id']
  }

  private validate({params}) {
    return /^[0-9a-z]+$/.test(params.item_id)
  }

  @State((state) => state.item) private item: {}
  @State((state) => state.items) private items: any[]

  private title: string = 'とりあえずやってみる'
}
</script>

<style lang="scss" scoped>
.it-MdContent {
  font-size: 11pt !important;
}
.p-items_wrapper {
  padding: 0;
}
.p-items_main {
  padding: 0 !important;
}
.p-items_article {
  max-width: 1200px;
  padding-top: 0;
}
.list {
}
</style>
