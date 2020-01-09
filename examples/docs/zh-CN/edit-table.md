## EditTable 可编辑表格组件

### 基本使用

columns兼容el-form-renderer的基本属性，表单数据支持双向绑定。type暂时只支持input和select，和支持自定义component属性。

:::demo

```html
<el-edit-table ref="form" :columns="columns" v-model="data"></el-edit-table>
<el-button @click="validate">校验表单</el-button>
<el-button @click="clearValidate">清除校验</el-button>
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
    },
    clearValidate() {
      this.$refs.form.clearValidate()
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
    this.$refs.form.setOptions('province', [{label:'广东', value: '1'}, {label: '江苏', value: '2'}])
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

### 禁止添加和删减

使用has-operation属性可禁止删减, 此时需要自己设定value数组的长度来决定表格的行数

:::demo

```html
<el-edit-table ref="form" :columns="columns" v-model="data" :has-operation="false"></el-edit-table>

<script>
export default {
  data() {
    return {
      data: Array(4).fill({}),
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
              validator: (rule, value, callback) => {
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
  mounted(){},
  methods: {}
}
</script>
```

:::

### 设置最小行数和最大行数

使用min和max属性设置最小行数和最大行数, min最小值为1，max>=min。此时value数组长度小于min会补齐，大于max会截取前max个数据。min默认为1，max默认为Infinity。

:::demo

```html
<div>只能设置3-5行数据：</div>
<el-edit-table ref="form" :columns="columns" v-model="data" :min="3" :max="5"></el-edit-table>

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
              validator: (rule, value, callback) => {
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
  }
}
</script>
```

:::

### 使用slot

设置默认slot可以在前面生成自定义列

:::demo

```html
<el-edit-table ref="form" :columns="columns" v-model="data">
  <el-table-column label="序列" width="50px" align="center">
    <template slot-scope="scope">{{scope.$index + 1}}</template>
  </el-table-column>
</el-edit-table>

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
              validator: (rule, value, callback) => {
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
  mounted(){},
  methods: {}
}
</script>
```

:::

### 使用slot表头

设置slot='header:'+column.id即可设置对应的表头内容

:::demo

```html
<el-edit-table ref="form" :columns="columns" v-model="data">
  <el-tooltip slot="header:name" slot-scope="scope" content="输入姓名">
    <span class="el-icon-s-custom">{{scope.column.label}}</span>
  </el-tooltip>
</el-edit-table>

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
              validator: (rule, value, callback) => {
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
  }
}
</script>
```

:::

### 事件触发

:::demo

```html
<el-edit-table ref="form" :columns="columns" v-model="data" @delete="deleteRow"></el-edit-table>

<script>
export default {
  data() {
    return {
      data: Array(3).fill({}),
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
              validator: (rule, value, callback) => {
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
    deleteRow(row, index) {
      this.$message.success(`删除了第${index+1}行数据，数据为${JSON.stringify(row)}`)
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
| min | 表格最少行数 | number |  自然数  |  1  |
| max | 表格最多行数 | number   |  自然数  |  Infinity  |
| hasOperation | 是否有添加和删除功能 | boolean   |  —  |  true  |

### Methods

| 方法名      | 说明          | 参数 |
|---------- |-------------- | -------------- |
| validate | 返回el-form的validate方法 | Function(callback: Function(boolean, object))|
| clearValidate | 返回el-form的clearValidate方法 | Function(props: string|array) |
|setOptions|同el-form-renderer的setOptions方法,前2个参数为列id,选项数组;第3个参数为所在行，起始行为0，不传则修改所有行的options|Function(id:string,options: array,index: number)|

### Slot

| name | 说明 |
|------|--------|
| default | 列表前插入内容 |
| add | 添加按钮的slot，当添加按钮样式文案等无法满足时使用 |
| delete | 删除按钮的slot，当删除按钮样式文案等无法满足时使用 |
| header:${column.id} | 自定义对应column表头内容 |

### Events

| Event Name | Description | Parameters |
|----| ---- | -------- |
| delete | 删除行事件 | row：行数据，index：行号 |
