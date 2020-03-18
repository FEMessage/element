<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!--链接-->
        <div class="footer-main">
          <h4>{{ langConfig.links }}</h4>
          <a href="" class="footer-main-link" target="_blank">{{ langConfig.dida }}</a>
          <a href="" class="footer-main-link" target="_blank">create-nuxt-app</a>
          <a href="" class="footer-main-link" target="_blank">Flutter</a>
          <a href="" class="footer-main-link" target="_blank">vue-sfc-cli</a>
        </div>

        <!--社区-->
        <div class="footer-main">
          <h4>{{ langConfig.community }}</h4>
          <a href="" class="footer-main-link" target="_blank">{{ langConfig.gitter }}</a>
          <a href="https://github.com/FEMessage/element/issues" class="footer-main-link" target="_blank">{{ langConfig.feedback }}</a>
          <a href="" class="footer-main-link" target="_blank">{{ langConfig.medium }}</a>
          <a href="" class="footer-main-link" target="_blank">{{ langConfig.frontend }}</a>
        </div>

        <!--帮助-->
        <div class="footer-main">
          <h4>{{ langConfig.help }}</h4>
          <a href="https://github.com/FEMessage/element" class="footer-main-link" target="_blank">GitHub</a>
          <a href="https://github.com/FEMessage/element/releases" class="footer-main-link" target="_blank">{{ langConfig.update }}</a>
          <a :href="`https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.${ lang }.md`" class="footer-main-link" target="_blank">{{ langConfig.faq }}</a>
      </div>

        <!--更多产品-->
        <div class="footer-main">
          <h4>{{ langConfig.more }}</h4>
          <a href="" class="footer-main-link" target="_blank">
            <img src="https://deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-design/logo_serverless.png" alt="">DEEPEXI Serverless</a>
          <a href="" class="footer-main-link" target="_blank">
            <img src="https://deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-design/logo_devops.png" alt="">DEEPEXI DevOps</a>
          <a href="" class="footer-main-link" target="_blank">
            <img src="https://deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-design/logo_daas.png" alt="">DEEPEXI DaaS</a>
          <a href="" class="footer-main-link" target="_blank">
            <img src="https://deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-design/logo_spaas.png" alt="">DEEPEXI SPaaS</a>
        </div>
      </div>

      <div class="line"></div>
      <copyright></copyright>

    </div>
  </footer>
</template>

<style lang="scss">
  .footer {
    background-color: #F5F6F9;
    width: 100%;
    margin-top: -361px;
    box-sizing: border-box;
    height: 361px;

    .container {
      box-sizing: border-box;
      width: 1140px;
      height: 100%;
      padding: 56px 30px 30px 30px;
    }


    .footer-content {
      display: flex;
      width: 100%;
      margin: 0 auto;
      padding-bottom: 80px;
      justify-content: space-between;
    }

    .footer-main {
      font-size: 0;
      display: inline-block;
      vertical-align: top;

      h4 {
        font-size: 18px;
        color: #333;
        line-height: 1;
        margin: 0 0 15px 0;
      }

      img {
        width: 12px;
        height: 12px;
        margin-right: 2px;
      }

      .footer-main-link {
        display: block;
        margin: 0;
        line-height: 2;
        font-size: 14px;
        color: #666;

        &:hover {
          color: #333;
        }
      }
    }

    .line {
      height: 1px;
      margin: 0 auto;
      background-color: #ddd;
    }
  }

  @media (max-width: 1140px) {
    .footer {
      width: 100%;
      height: auto;

      .container {
        padding: 30px;
        width: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    .footer {
      .footer-main {
        margin-bottom: 30px;
      }

      .footer-main-link {
        display: inline-block !important;
        width: 50%;
        white-space: nowrap;
      }

      .container {
        padding: 30px;
        width: 100%;
      }
      .footer-content {
        flex-direction: column;
        padding-bottom: 0;
      }
    }
  }
</style>

<script type="text/babel">
  import compoLang from '../i18n/component.json';
  import copyright from './copyright.vue';

  export default {
    data() {
      return {
      };
    },
    components: {
      copyright
    },

    computed: {
      lang() {
        return this.$route.path.split('/')[1] || 'zh-CN';
      },

      langConfig() {
        return compoLang.filter(config => config.lang === this.lang)[0]['footer'];
      }
    }
  };
</script>
