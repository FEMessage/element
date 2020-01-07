<template>
  <!-- number 多用于数量累加之类操作，而且 tel 有对应软键盘适配 -->
  <el-input
    type="tel"
    class="el-input-phone"
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    :placeholder="placeholder"
    @input="handleInput"
  />
</template>

<script>
import {areaGroup} from './const.js';

const ElInputPhone = {
  name: 'ElInputPhone',
  props: {
    /**
     * 手机号码
     */
    value: {
      type: String
    },
    /**
     * 占位文本
     */
    placeholder: {
      type: String,
      default: '请输入手机号码'
    }
  },
  data() {
    return {
      isError: false
    };
  },
  rules: [
    {
      validator(rule, value, callback) {
        if (!areaGroup.china.regEx.test(value)) {
          callback('请输入正确的手机号码');
          return false;
        }
        return true;
      },
      trigger: 'blur'
    }
  ],
  methods: {
    handleInput(value) {
      // 只能输出数字
      const newValue = value.replace(/[^\d]/g, '');
      if (!newValue.length) {
        this.emitInput('');
        return;
      }
      this.emitInput(newValue);
    },
    emitInput(value) {
      /**
       * 配合v-model使用
       */
      this.$emit('input', value);
    }
  }
};

export default ElInputPhone;

</script>
