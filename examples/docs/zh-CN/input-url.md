## InputUrl URL 输入框

### 结合el-form-renderer使用

在 el-form-renderer 里监听 blur 事件

:::demo

```html
<el-form-renderer :content="content" label-width="80px" />

<script>
// 正确import方式
// import {ElInputUrl} from '@femessage/element-ui'
const ElInputUrl = require('element-ui/packages/input-url/src/main.vue').default
export default {
  data() {
    return {
      content:[
        {
          id: 'url',
          label: 'url',
          component: ElInputUrl,
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

### Attributes

| 参数      |   说明    |  类型     | 可选值       | 默认值   |
|---------- | -------- |---------- |-------------  |-------- |
| value | url地址 | string   |  —  |  ''  |
| placeholder | 输入框占位符 | string   |  —  |  请输入 URL 地址  |
