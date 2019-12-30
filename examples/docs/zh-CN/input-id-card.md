## InputIdCard 身份证号码校验输入框

### 基本用法

:::demo

```html
<el-input-id-card v-model="value"></el-input-id-card>


<script>
export default {
  data() {
    return {
      value: ''
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
