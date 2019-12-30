## InputUrl url输入组件

### 基本用法

:::demo

```html
<template>
  <el-input-url v-model="url" />
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

### 不显示错误检查

当出现在form里时，不会显示自带的错误检查

:::demo

```html
<template>
  <el-form :modal="formData" label-width="50px">
    <el-form-item label="url" prop="url">
      <el-input-url v-model="formData.url"></el-input-url>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      formData:{
        url: ''
      }
    }
  },
}
</script>
```

:::

### 专门校验git仓库地址

:::demo

```html
<template>
  <el-input-url v-model="url" git />
</template>

<script>
export default {
  data() {
    return {
      url: 'git@github.com:FEMessage/el-data-table.git'
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
