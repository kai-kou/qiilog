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
          <v-flex class="list" xs12 v-for="post in items" :key="post.id">
            <v-card class="my-3" hover tile :href="post.id" v-if="$ua.deviceType() != 'crawler'">
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ post.title }}</div>
                  <span class="grey--text"></span>
                </div>
              </v-card-title>
              <v-card-text>
                <span class="grey--text">{{post.created_at}}</span><br>
                <v-chip outline color="secondary" v-for="tag in post.tags" :key="tag.id">{{tag.name}}</v-chip>
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
            {{$ua.deviceType()}}Made with
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
      title: this.title,
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
        { rel: 'stylesheet', href: 'https://unpkg.com/vuetify/dist/vuetify.min.css' },
        { rel: 'stylesheet', href: 'https://cdn.qiita.com/assets/public-f7955ff83ffb31880bac59d0cd469cbb.min.css' },
      ],
    }
  }

  @State((state) => state.items) private items: any[];

  private title: string = 'とりあえずやってみる';

  private mounted() {
    console.log(this.$ua.deviceType());
  }
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
</style>
