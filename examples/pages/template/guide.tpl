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
    box-shadow: 1px 0 2px 0 rgba(220,222,230,1);

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
    padding-left: 30px;
    /*padding-bottom: 32px;*/
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
  .main-footer {
  .footer {
    margin-top: 0;
  .container {
    width: 900px;
    margin: 0;
  }
  }
  }

  }


  @media (max-width: 768px) {
    .page-guide {
    .page-guide__nav {
      width: 100%;
      position: static;
      margin-top: 0;
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
  }
  }
</style>
<template>
  <el-scrollbar class="page-guide__scroll" ref="guideScrollBar">
    <div class="page-container page-guide">
      <el-scrollbar class="page-guide__nav">
        <side-nav :data="navsData" :base="`/${ lang }/guide`"></side-nav>
      </el-scrollbar>
      <div class="page-guide__main">
        <div class="page-guide__content">
          <router-view class="content"></router-view>
          <footer-nav></footer-nav>
        </div>
        <div class="main-footer">
          <main-footer></main-footer>
        </div>
      </div>
    </div>
  </el-scrollbar>
  <!--<div class="page-container page-guide">-->
    <!--<el-row>-->
      <!--<el-col :xs="24" :sm="5">-->
        <!--<side-nav :data="navsData" :base="`/${ lang }/guide`"></side-nav>-->
      <!--</el-col>-->
      <!--<el-col :xs="24" :sm="19">-->
        <!--<router-view class="content"></router-view>-->
      <!--</el-col>-->
    <!--</el-row>-->
  <!--</div>-->
</template>
<script>
  export default {
    data() {
      return {
        lang: this.$route.meta.lang,
        navsData: [
          {
            path: '/design',
            name: '设计原则'
          },
          {
            path: '/nav',
            name: '导航'
          }
        ]
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
