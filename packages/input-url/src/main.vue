<template>
  <el-input
    :class="['el-input-url', {'is-error': !valid}]"
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
  isGitRepo
} from './util.js';

const validator = (rule, value, callback) => {
  // console.log('validate', rule, value);
  // console.log(ElInputUrl);
  return false;
};

const ElInputUrl = {
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
    },
    message: {
      type: String,
      default: '请输入正确的url地址'
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
    }
  },
  rules() {
    return [
      // {required: true, trigger: 'blur'},
      {validator, message: ElInputUrl.message, trigger: ['blur']}
    ];
  },
  methods: {
    onBlur($event) {
      this.valid = this.validator(this.value);
    }
  }
};

export default ElInputUrl;
</script>
