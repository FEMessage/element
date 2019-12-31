## InputIdCard 身份证输入框

### 结合el-form-renderer使用

:::demo

```html
<el-form-renderer :content="content"></el-form-renderer>

<script>
// 正确的import方式
// import {InputIdCard} from '@femessage/element-ui'
const ElInputIdCard = require('element-ui/packages/input-id-card/src/main.vue').default
export default {
  data() {
    return {
      content: [
        {id:'id',label:'身份证号码',component: ElInputIdCard}
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
| value | 身份证号码 | string   |  —  |  —  |
| placeholder | 输入框placeholder | string   |  —  |  请输入身份证号  |
