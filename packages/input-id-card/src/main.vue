<template>
  <el-input
    class="el-input-id-card"
    type="text"
    :maxlength="valueLen"
    :placeholder="placeholder"
    v-bind="attrs"
    v-on="$listeners"
    :value="value"
    @input="handleInput"
  ></el-input>
</template>

<script>
import isIDCard from './is-id-card.js';

const validateIdCard = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入身份证号'));
  }
  if (isIDCard(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的身份证号'));
  }
};
export default {
  name: 'ElInputIdCard',

  props: {
    value: {
      type: String,
      required: true
    },

    placeholder: {
      type: String,
      default: '请输入身份证号'
    }
  },

  data() {
    return {
      valueLen: 18
    };
  },

  computed: {
    attrs() {
      const { ...rest } = this.$attrs;
      delete rest.type;
      delete rest.maxlength;
      return rest;
    }
  },

  rules: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    {
      validator: validateIdCard,
      trigger: 'blur'
    }
  ],

  methods: {
    handleInput(value) {
      this.$emit('input', value);
    }
  }
};
</script>
