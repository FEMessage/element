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
  <el-form-renderer :content="content" />
</template>

<script>
export default {
  data() {
    return {
      content: [
        {
          id: 'url',
          type: 'input-url'
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
