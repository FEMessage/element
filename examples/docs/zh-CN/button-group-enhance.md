## ElButtonGroupEnhance 可折叠按钮组

### 基本用法

可折叠的按钮组，常用于卡片底部放置聚合操作。

:::demo

```html
<template>
  <el-row :gutter="15">
    <el-col :span="10">
      <el-button-group-enhance
        :buttons="buttons()"
        type="primary"
        :collapse-at="3"
      />
      <el-button-group-enhance
        style="margin-top: 15px"
        :buttons="buttons()"
        :collapse-at="3"
      />
    </el-col>
    <el-col :span="10">
      <el-card shadow="hover">
        <div class="content">
          activate: {{activate}}
        </div>
        <el-button-group-enhance
          :buttons="buttons()"
          :collapse-at="3"
        />
      </el-card>
      <el-card shadow="hover" style="margin-top: 15px">
        <div class="content">
          activate: {{activate}}
        </div>
        <el-button-group-enhance
          :buttons="buttons()"
          type="primary"
          :collapse-at="3"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      activate: true,
      buttons: () => [
        {
          text: '查看应用信息',
          click: () => {
            return new Promise(r => setTimeout(r, 2000))
          },
        },
        {
          text: '开发者信息',
        },
        {
          text: `${this.activate ? '禁' : '启'}用应用`,
          click: () => {
            this.activate = !this.activate
          },
        },
        {
          text: '删除应用',
          show: !this.activate
        },
      ],
    }
  }
}
</script>
<style lang="scss">
.el-card .el-card__body {
  padding: 0;

  .content {
    padding: 20px;
  }
  .el-button-group-enhance {
    .el-button {
      border-bottom: none;
      border-radius: 0;
      &:first-child {
        border-left: none;
      }
      &.el-dropdown__caret-button {
        border-right: none;
      }
    }
  }
}
</style>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| buttons     | 按钮配置列表  | array  |   —    |    []     |
| buttons[0]     | el-button 的所有属性  | object  |   —    |    —     |
| buttons[0].text     | 按钮文案  | string  |   —    |    —     |
| buttons[0].click     | 点击按钮触发的操作  | function  |   —    |    —     |
| collapseAt  | 从第几个按钮开始折叠  | number  |   —    |    2     |
| moreText  | 折叠按钮的文案 | string  |   —    |    更多     |
| size  | 尺寸 | string  |   mini /small / median    |  small |
| type  | 类型 | string  | primary / success / warning / danger / info / text  | default  |
