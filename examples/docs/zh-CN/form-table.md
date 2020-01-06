## FormTable 表格式表单组件

### 基本使用

columns兼容el-form-renderer的基本属性，表单数据支持双向绑定

:::demo

```html
<el-form-table ref="form" :columns="columns" v-model="data"></el-form-table>
<el-button @click="validate">校验表单</el-button>
<div>当前数据：{{data}}</div>

<script>
export default {
  data() {
    return {
      data: [],
      columns:[
        {id: 'name', label: '姓名', type: 'input', el: {placeholder: '输入姓名'}, rules: [{required: true, trigger: 'blur', message: '请输入姓名'}]},
        {
          id: 'phone',
          label: '手机号',
          type: 'input',
          default: '13',
          el: {placeholder: '输入手机号码'},
          rules:[
            {
              validator: (rule,value,callback) => {
                if(value && !/^1\d{10}$/.test(value)){
                  callback(new Error('请输入正确的手机号码'))
                  return false
                }
                return true
              },
              trigger: 'blur',
            }
          ]
        },
        {id: 'sex' , label: '性别', type: 'select', el: {placeholder: '选择性别'}, options: [{label: '男', value: 'male'}, {label: '女', value: 'female'}]}
      ]
    }
  },
  methods: {
    validate(){
      this.$refs.form.validate()
    }
  }
}
</script>
```

:::

