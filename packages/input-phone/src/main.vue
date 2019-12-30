<template>
  <!-- number 多用于数量累加之类操作，而且 tel 有对应软键盘适配 -->
  <el-input
    type="tel"
    :class="['el-input-phone', {'input-error': isError}]"
    v-bind="$attrs"
    :value="value"
    :placeholder="placeholder"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import {areaGroup, DEFAULTVALUE} from './const.js';

export default {
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
    },
    /**
     * 自动填充
     */
    autoFill: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isError: false,
      select: areaGroup.china
      // options: Object.values(areaGroup)
    };
  },
  methods: {
    handleInput(value) {
      // 只能输出数字
      const newValue = value.replace(/[^\d]/g, '');
      if (!newValue.length) {
        this.emitInput('');
        return;
      }
      this.emitInput(newValue);
      this.verifyInput(value);
    },
    handleBlur(event) {
      this.verifyLength(event.target.value);
      this.$nextTick(() => {
        this.verifyInput(event.target.value);
      });
    },
    verifyInput(value) {
      if (!this.select.regEx.test(value)) {
        this.isError = true;
        return;
      }
      this.isError = false;
    },
    verifyLength(value) {
      if (
        !value.length ||
        value.length === 1 ||
        !this.select.regExPrefix.test(value)
      ) {
        this.autoFill && this.emitInput(DEFAULTVALUE);
        return;
      }
      if (value.length < this.select.max) {
        const diffCount = this.select.max - value.length + 1;
        this.emitInput(value + Array(diffCount).join('0'));
        return;
      }
    },
    emitInput(value) {
      /**
       * 配合v-model使用
       */
      this.$emit('input', value);
    }
  }
};
</script>
