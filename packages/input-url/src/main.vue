<template>
  <el-input
    class="el-input-url"
    :value="value"
    :placeholder="placeholder"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'ElInputUrl',
  rules: [
    {
      type: 'url',
      message: '请输入正确的 URL 地址',
      trigger: 'blur'
    }
  ],
  props: {
    /**
     * @model
     */
    value: {
      type: String,
      default: ''
    },
    /**
     * 输入框占位符
     */
    placeholder: {
      type: String,
      default: '请输入 URL 地址'
    }
  }
};
</script>
