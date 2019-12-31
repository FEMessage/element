## InputPhone 手机号码输入

### 基本用法

:::demo

```html
<el-input-phone class="el-form-item" v-model="phone" />

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

### 结合el-form-renderer使用

在form-renderer里监听change和blur事件

:::demo

```html
<el-form-renderer :content="content" label-width="80px"></el-form-renderer>

<script>
const ElInputPhone = require('../../../packages/input-phone/src/main.vue').default
export default {
  data() {
    return {
      content:[
        {id: 'phone', label: 'Phone', component: ElInputPhone}
      ]
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
