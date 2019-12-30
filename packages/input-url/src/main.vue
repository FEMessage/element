<template>
  <el-input
    :class="['el-input-url', {invalid: !valid}]"
    :value="value"
    :maxlength="2000"
    v-bind="$attrs"
    :placeholder="$attrs.placeholder || '请输入url'"
    v-on="$listeners"
    @blur="onBlur"
  />
</template>

<script>
import {
  isWebUri,
  isHttpsGitRepo,
  isGitRepo,
  normalizeUrl,
  normalizeGitUrl
} from './util.js';

export default {
  name: 'ElInputUrl',
  props: {
    /**
     * @model
     */
    value: {
      type: String,
      default: ''
    },
    /**
     * 是否开启校验git仓库地址。
     * 模板：http[s] ://host.xz[:port]/path/to/repo.git/
     */
    git: {
      type: Boolean,
      default: false
    },
    /**
     * git仓库地址是否还包含ssh类型，仅当git===true时生效。
     * 模板：[user@]host.xz:path/to/repo.git/
     */
    ssh: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valid: true
    };
  },
  computed: {
    validator() {
      if (this.git) {
        return this.ssh ? isGitRepo : isHttpsGitRepo;
      } else {
        return isWebUri;
      }
    },
    normalize() {
      return this.git ? normalizeGitUrl : normalizeUrl;
    }
  },
  methods: {
    onBlur() {
      let {value} = this;
      value = this.normalize(value);
      this.$emit('input', value);
      if (this.$parent.$options.name !== 'ElFormItem') {
        this.valid = this.validator(value);
      }
    }
  }
};
</script>
