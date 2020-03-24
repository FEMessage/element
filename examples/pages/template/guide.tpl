<style>
  .page-guide__scroll {
    height: calc(100% - 80px);
    margin-top: 80px;

  > .el-scrollbar__wrap {
    overflow-x: auto;
  }
  }

  .page-guide {
    box-sizing: border-box;
    height: 100%;

  &.page-container {
     padding: 0;
   }

  .page-guide__nav {
    width: 240px;
    position: fixed;
    top: 0;
    bottom: 0;
    margin-top: 80px;
    transition: padding-top .3s;
    box-shadow: 1px 0 0 0 rgba(220,222,230,1);

  > .el-scrollbar__wrap {
    height: 100%;
    overflow-x: auto;
  }

  &.is-extended {
     padding-top: 0;
   }
  }

  .side-nav {
    height: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-right: 0;

  & > ul {
      padding-bottom: 50px;
    }
  }

  .page-guide__main {
    padding-left: 240px;
  }

  .page-guide__content {
    padding-left: 100px;
    padding-right: 50px;
    box-sizing: border-box;
  }

  .content {
    padding-top: 50px;

  > {
  h3 {
    margin: 55px 0 20px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    background-color: #fff;
    font-size: 14px;
    margin-bottom: 45px;
    line-height: 1.5em;

  strong {
    font-weight: normal;
  }

  td, th {
    border-bottom: 1px solid #dcdfe6;
    padding: 15px;
    max-width: 250px;
  }

  th {
    text-align: left;
    white-space: nowrap;
    color: #909399;
    font-weight: normal;
  }

  td {
    color: #606266;
  }

  th:first-child, td:first-child {
    padding-left: 10px;
  }
  }

  ul:not(.timeline) {
    margin: 10px 0;
    padding: 0 0 0 20px;
    font-size: 14px;
    color: #5e6d82;
    line-height: 2em;
  }
  }
  }
  .footer {
    margin-top: 0;
    width: calc(100vw - 240px - (100vw - 1140px) / 2);
  .container {
    width: 900px;
    margin: 0;
    padding: 56px 30px 30px 50px;
  }
  }

  }


  @media (max-width: 768px) {
    .page-guide {
    .page-guide__main {
      padding-left: 0;
    }
    .page-guide__nav {
      width: 100%;
      position: static;
      margin-top: 0;
      display: none;
    }
    .side-nav {
      padding-top: 0;
      padding-left: 50px;
    }
    .page-guide__content {
      padding-left: 10px;
      padding-right: 10px;
    }
    .content {
      padding-top: 0;
    }
    .content > table {
      overflow: auto;
      display: block;
    }
    .footer {
      margin-top: 0;
      width: 100%;
      .container {
        width: 100%;
        margin: 0;
        padding: 30px;
      }
    }
  }
  }
</style>
<template>
  <el-scrollbar class="page-guide__scroll" ref="guideScrollBar">
    <div class="page-container page-guide">
      <el-scrollbar class="page-guide__nav">
        <side-nav :data="navsData[lang]" :base="`/${ lang }/guide`"></side-nav>
      </el-scrollbar>
      <div class="page-guide__main">
        <div class="page-guide__content">
          <router-view class="content"></router-view>
          <footer-nav></footer-nav>
        </div>
        <main-footer></main-footer>
      </div>
    </div>
  </el-scrollbar>
</template>
<script>
  import navsData from '../../design.config.json';
  export default {
    data() {
      return {
        lang: this.$route.meta.lang,
        navsData
      };
    },
    mounted() {
      document.body.classList.add('is-guide');
    },
    destroyed() {
      document.body.classList.remove('is-guide');
    }
  };
</script>
