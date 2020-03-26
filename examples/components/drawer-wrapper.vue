<template>
  <div>
      <div class="drawer-handle" @click="drawer = true">
          <i class="el-icon-menu"></i>
      </div>

      <el-drawer
              :visible.sync="drawer"
              direction="ltr"
              :append-to-body="true"
              :showClose="false"
              :withHeader="false"
              size="60%"
      >
          <side-nav :data="data" :base="base"></side-nav>
      </el-drawer>
  </div>
</template>

<script>
    export default {
      name: 'drawer-wrapper',
      props: {
        data: {
          type: Array,
          default() {
            return [];
          }
        },
        base: {
          type: String,
          default: ''
        }
      },
      data() {
        return {
          drawer: false
        };
      },
      watch: {
        '$route.path': {
          handler(val) {
            if (this.drawer && val) {
              this.drawer = false;
            }
          }
        }
      }
    };
</script>

<style>
    .drawer-handle {
        position: absolute;
        top: 15%;
        width: 41px;
        height: 40px;
        cursor: pointer;
        z-index: 9;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        background: #fff;
        box-shadow: 2px 0 8px rgba(0,0,0,.15);
        border-radius: 0 4px 4px 0;
        display: none;
    }
   .el-drawer.ltr {
       overflow: auto;
    }

    @media (max-width: 768px) {
        .drawer-handle {
            display: block;
        }
    }
</style>