<template>
  <div
    class="el-input-id-card"
    :class="[{
      'self-form-item': !isInElFormItem,
      'is-error': validateState === 'error' && !isInElFormItem,
    }]"
  >
    <el-input
      type="text"
      :maxlength="valueLen"
      :placeholder="placeholder"
      v-bind="attrs"
      @blur="handleBlur"
      v-on="$listeners"
      v-model="innerValue"
    ></el-input>
    <transition name="el-zoom-in-top">
      <div
        class="self-form-item__error"
        v-if="!isInElFormItem && validateState === 'error'"
      >{{validateMessage}}</div>
    </transition>
  </div>
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
      innerValue: '',
      valueLen: 18,
      validateState: '',
      validateMessage: ''
    };
  },

  computed: {
    attrs() {
      const { ...rest } = this.$attrs;
      delete rest.type;
      delete rest.maxlength;
      return rest;
    },

    isInElFormItem() {
      return this.$parent.$options.name === 'ElFormItem';
    },

    ElFormItem() {
      return this.$parent;
    }
  },

  watch: {
    innerValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', this.innerValue);
      }
    }
  },

  rules() {
    return [
      { required: true, message: '请输入身份证号', trigger: 'blur' },
      {
        validator: validateIdCard,
        trigger: ['blur', 'change']
      }
    ];
  },

  methods: {
    handleBlur(e) {
      // 补全 补0
      if (this.innerValue.length < this.valueLen) {
        this.innerValue = this.fixWithExampleID(this.innerValue);
      }
      // 验证
      // this.validateIdCard([], this.innerValue, this.validateCallback)
    },
    validateCallback(error) {
      if (error) {
        this.validateState = 'error';
        this.validateMessage = error.message || error;
      } else {
        this.validateState = 'success';
      }
    },

    fixWithExampleID(value = '', opts = { boundary: this.valueLen }) {
      if (value.length > opts.boundary) {
        return value;
      }
      const subFixId = '440106200001019398';
      const fix = subFixId.substring(value.length, opts.boundary);
      return `${value}${fix}`;
    }
  }
};
</script>
