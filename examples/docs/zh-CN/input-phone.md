## InputPhone 手机号码输入

基本用法
:::demo

```html
<template>
  <el-input-phone v-model="phone" />
</template>

<script>
export default {
  data() {
    return {
      phone: '132'
    }
  }
}
</script>
```

:::

### Attributes

| 参数      |   说明    |  类型     | 可选值       | 默认值   |
|---------- | -------- |---------- |-------------  |-------- |
| value | 手机号 | string   |  —  |  —  |
| placeholder | 输入框placeholder | string   |  —  |  请输入手机号码  |
| auto-fill | blur事件自动是否填充默认值 | boolean   |  —  |  true  |
