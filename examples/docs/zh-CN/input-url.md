## InputUrl url输入组件

### 基本用法

:::demo

```html
<template>
  <el-input-url class="el-form-item" v-model="url" />
</template>

<script>
export default {
  data() {
    return {
      url: ''
    }
  },
}
</script>
```

:::

### 配合el-form-renderer使用

:::demo

```html
<el-form-renderer :content="content" label-width="50px"></el-form-renderer>

<script>
const ElInputUrl = require('../../../packages/input-url/src/main.vue').default
export default {
  data() {
    return {
      content: [
        {
          id: 'url',
          label: 'url',
          component: ElInputUrl
        }
      ]
    }
  },
}
</script>
```

:::

### 专门校验git仓库地址

:::demo

```html
<div>
  url模式：<el-input-url class="el-form-item" v-model="url" git />
  ssh模式: <el-input-url class="el-form-item" v-model="ssh" git ssh />
</div>

<script>
export default {
  data() {
    return {
      url: 'http://www.github.com/femessage/element.git',
      ssh: 'git@github.com:FEMessage/el-data-table.git'
    }
  },
}
</script>
```

:::

### Attributes

| 参数      |   说明    |  类型     | 可选值       | 默认值   |
|---------- | -------- |---------- |-------------  |-------- |
| value | url地址 | string   |  —  |  —  |
| git | 是否开启校验git仓库地址。<br>模板：http[s] ://host.xz[:port]/path/to/repo.git/ | boolean   |  —  |  false  |
| ssh | git仓库地址是否还包含ssh类型，仅当git===true时生效。<br>模板：[user@]host.xz:path/to/repo.git/ | boolean   |  —  |  false  |
