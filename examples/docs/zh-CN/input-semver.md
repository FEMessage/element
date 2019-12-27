## InputSemver 版本号输入

### 基本用法

默认按TAB或失去焦点自动填充，自动添加前缀，和阻止非法输入

:::demo

```html
<template>
  <el-input-semver v-model="version" @valid-change="validChange"/>
</template>

<script>
export default {
  data() {
    return {
      version: ''
    }
  },
  methods: {
    validChange(isValid) {
      console.log(isValid)
    }
  }
}
</script>
```

:::

### 自定义填充规则:x.x.x

:::demo

```html
<template>
  <el-input-semver v-model="version" :auto-padding-regular-list="paddingList" />
</template>
<script>
export default {
  data() {
    return {
      version: '',
      // 自动填充规则
      paddingList: [
        {
          regular: /^v?([1-9]\d*|0)\.([1-9]\d*|0)\.$/,
          padding: 'x'
        },
        {
          regular: /^v?([1-9]\d*|0)\.([1-9]\d*|0)$/,
          padding: '.x'
        },
        {
          regular: /^v?([1-9]\d*|0)\.$/,
          padding: 'x.x'
        },
        {
          regular: /^v?([1-9]\d*|0)$/,
          padding: '.x.x'
        },
        {
          regular: /^v$/,
          padding: 'x.x.x'
        }
      ]
    }
  }
}
</script>
```

:::

### 自定义验证正则

本例:每项最多两位数
:::demo

```html
<template>
  <el-input-semver v-model="version" :valid-regular="regular" />
</template>

<script>
export default {
  data() {
    return {
      version: '',
      regular: /^v?([1-9]\d?|0)\.([1-9]\d?|0)\.([1-9]\d?|0)$/
    }
  }
}
</script>
```

:::
