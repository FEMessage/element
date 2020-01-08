## EditTable 表格式表单组件

### 基本使用

columns兼容el-form-renderer的基本属性，表单数据支持双向绑定。type暂时只支持input和select，和支持自定义component属性。

:::demo

```html
<el-edit-table ref="form" :columns="columns" v-model="data"></el-edit-table>
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

### 使用setOptions

setOptions使用方法和el-form-renderer的基本一致。但有第三个参数index来单独设置某行的options，没有第三个参数则设置所有行的options

:::demo

```html
<el-edit-table ref="form" :columns="columns" v-model="data"></el-edit-table>

<script>
export default {
  data() {
    return {
      data: [],
      columns:[
        {id: 'name', label: '姓名', type: 'input', el: {placeholder: '输入姓名'}, rules: [{required: true, trigger: 'blur', message: '请输入姓名'}]},
        {
          id: 'province',
          label: '省',
          type: 'select',
          el: {placeholder: '选择省'},
          on: {
            change: this.setCityOptions
          }
        },
        {id: 'city' , label: '市', type: 'select', el: {placeholder: '选择市'}, options: []}
      ]
    }
  },
  mounted(){
    this.$refs.form.setOptions('province', [{label:'广东', value: '1'}, {label: '江苏', value: '2'}], 0)
  },
  methods: {
    setCityOptions(data, value){
      if(value === '1') {
        this.$refs.form.setOptions('city', [{label: '广州', value: '11'}, {label: '深圳', value: '12'}], data.index)
      }else if(value === '2') {
        this.$refs.form.setOptions('city', [{label: '南京', value: '21'}, {label: '无锡', value: '22'}], data.index)
      }
    }
  }
}
</script>
```

:::

### Attributes

| 参数      |   说明    |  类型     | 可选值       | 默认值   |
|---------- | -------- |---------- |-------------  |-------- |
| value | 表单数据 | array   |  —  |  —  |
| columns | 表单字段,table列属性;和el-form-renderer的content基本一致 | array   |  —  |  —  |

### Methods

| 方法名      | 说明          | 参数 |
|---------- |-------------- | -------------- |
| validate | 返回el-form的validate方法 | Function(callback: Function(boolean, object))|
|setOptions|同el-form-renderer的setOptions方法,前2个参数为列id,选项数组;第3个参数为所在行，起始行为0，不传则修改所有行的options|Function(id:string,options: array,index: number)|

### Slot

| name | 说明 |
|------|--------|
| add | 添加按钮的slot，当添加按钮样式文案等无法满足时使用 |
| delete | 删除按钮的slot，当删除按钮样式文案等无法满足时使用 |
