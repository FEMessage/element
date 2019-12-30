## SwitchEnhance 开关增强

表示两种相互对立的状态间的切换，多用于触发「开/关」，与 `el-switch` 用法一致。

### 基本用法

:::demo 绑定`v-model`到一个`Boolean`类型的变量。可以使用`active-color`属性与`inactive-color`属性来设置开关的背景色。

```html
<template>
  <el-switch-enhance v-model="switchValue0" active-text="开" inactive-text="关" />
</template>

<script>
export default {
  data() {
    return {
      switchValue0: true
    }
  }
}
</script>
```
:::


## 文字在切换内部

:::demo 使用 `inline-text` 属性将提示文字放到组件内部

```html
<template>
  <el-switch-enhance
    v-model="value1"
    :width="85"
    inline-text
    active-text="按月付费"
    inactive-text="按年付费"
  />
</template>

<script>
export default {
  data() {
    return {
      value1: true
    }
  }
}
</script>
:::


## 方形切换

:::demo 使用 `square` 属性减小组件圆角

```html
<template>
  <el-switch-enhance
    v-model="value2"
    square
    inline-text
    :width="70"
    active-text="已启用"
    inactive-text="已关闭"
  />
</template>

<script>
export default {
  data() {
    return {
      value2: true
    }
  }
}
</script>
```
:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值 | boolean / string / number | — | — |
| disabled  | 是否禁用    | boolean   | — | false   |
| width  | switch 的宽度（像素）    | number   | — | 40 |
| active-icon-class  | switch 打开时所显示图标的类名，设置此项会忽略 `active-text`    | string   | — | — |
| inactive-icon-class  | switch 关闭时所显示图标的类名，设置此项会忽略 `inactive-text`    | string   | — | — |
| active-text  | switch 打开时的文字描述    | string   | — | — |
| inactive-text  | switch 关闭时的文字描述    | string   | — | — |
| active-value  | switch 打开时的值    | boolean / string / number | — | true |
| inactive-value  | switch 关闭时的值    | boolean / string / number | — | false |
| active-color  | switch 打开时的背景色    | string   | — | #5D81F9 |
| inactive-color  | switch 关闭时的背景色    | string   | — | #C0CCDA |
| name            | switch 对应的 name 属性    | string   | — | — |
| validate-event  | 改变 switch 状态时是否触发表单的校验     | boolean   | - | true |
| inline-text  | 提示文字是否在 switch 内部     | boolean   | - | false |
| square  | 方形的 switch      | boolean   | - | false |

### Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | switch 状态发生变化时的回调函数    | 新状态的值 |

### Methods

| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 Switch 获取焦点 | - |
