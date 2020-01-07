<template>
  <el-input
    class="el-input-url"
    :value="value"
    :maxlength="2000"
    v-bind="$attrs"
    :placeholder="$attrs.placeholder || '请输入url'"
    v-on="$listeners"
  />
</template>

<script>
import validUrl from 'valid-url';

export default {
  name: 'ElInputUrl',
  rules: [
    {
      validator(r, v, cb) {
        if (validUrl.isWebUri(v)) cb();
        else cb(new Error('请输入正确的 URL 地址'));
      },
      trigger: 'blur'
    },
  ],
  props: {
    /**
     * @model
     */
    value: {
      type: String,
      default: ''
    }
  }
};
</script>
