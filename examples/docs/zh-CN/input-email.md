## InputEmail 邮箱地址输入

### 结合el-form-renderer使用

在 el-form-renderer 里监听 blur 事件

:::demo

```html
<el-form-renderer :content="content" label-width="80px" />

<script>
// 正确import方式
// import {ElInputEmail} from '@femessage/element-ui'
const ElInputEmail = require('element-ui/packages/input-email/src/main.vue').default
export default {
  data() {
    return {
      content:[
        {
          id: 'email',
          label: 'email',
          component: ElInputEmail,
          default: '',
          on: {
            input: ([v]) => console.log(v)
          }
        }
      ],
    }
  }
}
</script>
```

:::

### 自定义提示的邮箱列表

:::demo

```html
<el-form-renderer :content="content" label-width="80px" />

<script>
// 正确import方式
// import {ElInputEmal} from '@femessage/element-ui'
const ElInputEmail = require('element-ui/packages/input-email/src/main.vue').default
export default {
  data() {
    return {
      content:[
        {
          id: 'email',
          label: 'email',
          component: ElInputEmail,
          default: '',
          el: {
            emailList: [
              'deepexi.com',
            ]
          }
        }
      ],
    }
  }
}
</script>
```

:::

### Attributes

| 参数      |   说明    |  类型     | 可选值       | 默认值   |
|---------- | -------- |---------- |-------------  |-------- |
| value | 邮箱地址 | string   |  —  |  —  |
| placeholder | 输入框placeholder | string   |  —  |  请输入邮箱地址  |
| emailList | 提示补全的邮箱列表 | array   |  —  |  gmail、qq 等  |
