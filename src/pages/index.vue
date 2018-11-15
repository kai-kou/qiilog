<template>
  <div class="page-index">
    <h1>Nuxt Serverless Template {{ this.version }}</h1>
    <p>{{ message }}</p>
    <nuxt-link to="/typescript">typescript</nuxt-link>
    <nuxt-link to="/nuxt">nuxt</nuxt-link>
    <div class="p-items_wrapper">
      <!-- <div class="p-items_container"> -->
        <!-- <div class="p-items_stickyMenu it-Actions" data-mount-target="articleStickyMenu">
        </div> -->

        <div class="p-items_main">
          <div class="p-items_article">
            <section class="it-MdContent">
              <div v-html="this.item.rendered_body"></div>
            </section>
          </div>
        </div>

        <!-- <div class="p-items_options"><div id="dfp-slot-sidebar-top" style="width: 300px; height: 250px; margin-top: 16px;">
          <div id="google_ads_iframe_/383564218/qiita.com_loginuser_sidebar-top_0__container__" style="border: 0pt none;">
          </div>
        </div>
        <div style="margin-top: 4px; text-align: right; font-size: 0.9em;">
        </div> -->
    </div>
      <!-- <div class="p-items_toc"><script type="application/json" id="js-react-on-rails-context">{}</script>
        <div id="Toc-react-component-4affe30d-6703-4baa-ab49-98672e08748f">
          <div data-reactroot="" class="tocTree">
            <div class="tocTree_contents nav" style="max-height: 927px;">
              <ul>
                <li>
                <a href="#%E6%A6%82%E8%A6%81">概要</a>
                </li>
                <li>
                <a href="#%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89">環境構築</a>
                </li>
                <li>
                <a href="#%E5%AE%9F%E8%A3%85">実装</a>
                <ul>
                <li>
                <a href="#%E5%A4%A7%E3%81%BE%E3%81%8B%E3%81%AA%E6%B5%81%E3%82%8C">大まかな流れ</a>
                </li>
                <li>
                <a href="#%E5%90%84%E3%83%91%E3%83%A9%E3%83%A1%E3%83%BC%E3%82%BF%E3%81%AE%E6%8C%87%E5%AE%9A%E6%96%B9%E6%B3%95">各パラメータの指定方法</a>
                </li>
                <li>
                <a href="#mfa%E3%81%AE%E6%9C%89%E5%8A%B9%E5%8C%96">MFAの有効化</a>
                </li>
                </ul>
                </li>
                <li>
                <a href="#%E5%8B%95%E4%BD%9C%E7%A2%BA%E8%AA%8D">動作確認</a>
                </li>
                <li>
                <a href="#%E3%81%BE%E3%81%A8%E3%82%81">まとめ</a>
                </li>
                <li>
                <a href="#%E5%8F%82%E8%80%83">参考</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> -->
      <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State } from 'vuex-class'

@Component
export default class PageIndex extends Vue {
  /**
   * You can fetch data from remote server with 'asyncData()' method
   */
  private async asyncData() {
    return {
      message: 'Say Hello to Node.js 8.10 in AWS Lambda and Nuxt 2.0',
    }
  }

  /**
   * overide tags in <head> with 'head()' method
   */
  private head() {
    return {
      title: 'Hello, Nuxt Serverless Template',
      link: [
        { rel: 'stylesheet', href: 'https://cdn.qiita.com/assets/public-f7955ff83ffb31880bac59d0cd469cbb.min.css' },
      ],
    }
  }

  @State((state) => state.version) private version: string

  @State((state) => state.item) private item: {}
}
</script>

<style lang="scss">
.page-index {
  h1 {
    color: #087f5b;
  }
}
</style>
