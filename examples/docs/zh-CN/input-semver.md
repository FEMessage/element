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

### Attributes

| 参数      |   说明    |  类型     | 可选值       | 默认值   |
|---------- | -------- |---------- |-------------  |-------- |
| value | 版本号 | string   |  —  |  —  |
| prevent-illegal | 是否阻止非法输入字符 | boolean   |  —  |  true  |
| auto-padding | 是否根据填充规则进行自动填充 | boolean   |  —  |  true  |
| prefix | 是否需要v前缀 | boolean   |  —  |  true  |
| valid-regular | 自定义格式校验规则 | regExp   |  —  |  /^v?([1-9]\d*|0)\.([1-9]\d*|0)\.([1-9]\d*|0)$/  |
| auto-padding-regular-list | 自定义自动填充规则 | array   |  —  |  autoPaddingRegularList(见下面)  |

#### autoPaddingRegularList

```javascript
[
  {
    regular: VERSION_PATTERN,
    padding: ''
  },
  {
    regular: /^v?([1-9]\d*|0)\.([1-9]\d*|0)\.$/,
    padding: '0'
  },
  {
    regular: /^v?([1-9]\d*|0)\.([1-9]\d*|0)$/,
    padding: '.0'
  },
  {
    regular: /^v?([1-9]\d*|0)\.$/,
    padding: '0.0'
  },
  {
    regular: /^v?([1-9]\d*|0)$/,
    padding: '.0.0'
  },
  {
    regular: /^v?$/,
    padding: DEFAULT_VERSION
  }
]
```
