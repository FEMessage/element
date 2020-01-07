<template>
  <el-autocomplete
    type="email"
    class="el-input-email"
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    :placeholder="placeholder"
    :fetch-suggestions="getSuggestions"
    highlight-first-item
    hide-loading
  />
</template>

<script>
import defaultEmailList from './email-list.js';
const emailReg = /^[\w-]+@[\w-]+(\.[\w-]+)+$/;
export default {
  name: 'ElInputEmail',
  rules: [
    {
      pattern: emailReg,
      message: '请输入正确的邮箱地址',
      trigger: 'blur'
    }
  ],
  props: {
    /**
     * 提示补全的邮箱列表
     */
    emailList: {
      type: Array,
      default() {
        return defaultEmailList;
      }
    },
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
  },
  methods: {
    getSuggestions(input, cb) {
      if (!input.length) return cb([]);

      const i = input.indexOf('@');
      let suggestions;
      if (i === -1) {
        suggestions = this.emailList.map(server => ({
          value: input + '@' + server
        }));
      } else {
        const right = input.slice(i + 1);
        suggestions = this.emailList
          .filter(server => server.startsWith(right))
          .map(server => ({
            value: input.slice(0, i + 1) + server
          }));
      }
      cb(suggestions);
    }
  }
};
</script>
