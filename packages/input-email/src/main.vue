<template>
  <el-input
    type="email"
    class="el-input-email"
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    :placeholder="placeholder"
  />
</template>

<script>
const emailReg = /^[\w-]+@[\w-]+(\.[\w-]+)+$/;
export default {
  name: 'ElInputEmail',
  rules() {
    return [
      {
        pattern: emailReg,
        message: '请输入正确的邮箱地址',
        trigger: ['blur', 'change']
      }
    ];
  },
  props: {
    /**
     * 占位文本
     */
    placeholder: {
      type: String,
      default: '请输入邮箱地址'
    },
    /**
     * 输入邮箱
     */
    value: {
      type: String,
      required: true
    }
  }
};
</script>
