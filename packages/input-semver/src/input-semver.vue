<template>
  <el-input placeholder="请输入版本号" v-bind="$attrs" v-on="$listeners" :value="version" class="semver-input" :class="{'is-error':!isValid}" @input="handelInput" @blur="handleBlur">
  </el-input>
</template>
<script>
/**
 * 版本号正则
 * 匹配（0或者大于0的数字）(.)（0或者大于0的数字）(.)（0或者大于0的数字）
 * 如1.11.0
 */

const VERSION_PATTERN = /^v?([1-9]\d*|0)\.([1-9]\d*|0)\.([1-9]\d*|0)$/

// 默认版本
const NONSENSE_VERSION = '0.0.0'
const MIN_VERSION = '0.0.1'
const DEFAULT_VERSION = '1.0.0'
const v = 'v'

// 自动填充规则
const autoPaddingRegularList = [
  {
    regular: VERSION_PATTERN,
    padding: ''
  },
  {
    regular: /^v?([1-9]\d*|0)\.([1-9]\d*|0)\.$/,
    padding: '0'
  },
  {
    regular: /^v?([1-9]\d*|0)\.([1-9]\d*|0)$/,
    padding: '.0'
  },
  {
    regular: /^v?([1-9]\d*|0)\.$/,
    padding: '0.0'
  },
  {
    regular: /^v?([1-9]\d*|0)$/,
    padding: '.0.0'
  },
  {
    regular: /^v?$/,
    padding: DEFAULT_VERSION
  }
]

const autoFixRegular = [
  {
    // 都为0只保留一个0
    regular: /^v?([1-9]\d*|0)\.([1-9]\d*|0)\.0+$/,
    fixStr(str) {
      let stringList = str.split('.')
      let last = stringList.length - 1

      stringList[last] = stringList[last].replace(/^0+/, '0')
      return stringList.join('.')
    }
  },
  {
    // 将1.1.000001格式连续的0去掉为1.1.1
    regular: /^v?([1-9]\d*|0)\.([1-9]\d*|0)\.0+[1-9]\d*$/,
    fixStr(str) {
      let stringList = str.split('.')
      let last = stringList.length - 1

      stringList[last] = stringList[last].replace(/^0+/, '')
      return stringList.join('.')
    }
  },
  {
    // 将1.1.1.1.1截取为1.1.1
    regular: /^v?([1-9]\d*|0)\.([1-9]\d*|0)\.\d+\.(.*)$/,
    fixStr(str) {
      return str
        .split('.')
        .slice(0, 3)
        .join('.')
    }
  }
]

export default {
  name: 'ElInputSemver',
  props: {
    /**
     * 输入框默认值
     */
    value: {
      type: String
    },
    /**
     * 是否阻止非法输入字符
     */
    preventIllegal: {
      type: Boolean,
      default: true
    },
    /**
     * 是否根据填充规则进行自动填充
     */
    autoPadding: {
      type: Boolean,
      default: true
    },
    /**
     * 是否需要v前缀
     */
    prefix: {
      type: Boolean,
      default: true
    },
    /**
     * 自定义格式校验规则
     */
    validRegular: {
      type: RegExp,
      default: () => VERSION_PATTERN
    },
    /**
     * 自定义自动填充规则
     */
    autoPaddingRegularList: {
      type: Array,
      default: () => autoPaddingRegularList
    }
  },
  data() {
    return {
      version: this.value,
      isValid: true
    }
  },
  watch: {
    // 同步外面传进来的value
    value(data) {
      this.version = data
    }
  },
  methods: {
    handelInput(e = '') {
      let hasV = false

      // 如果需要阻止非法输入,则替换除了开头的第一个v，数字，点为空
      if (this.preventIllegal) {
        e = e.replace(/[^\d\.]/g, function(data) {
          if (data == v && e.startsWith(v) && !hasV) {
            hasV = true
            return v
          }
          return ''
        })
      }

      // 如果需要前缀且当前value不是v开头,则自动带上v
      let value = this.prefix && e.length > 0 && !e.startsWith(v) ? v + e : e
      let isValid = this.checkVersionVaild(value)

      // this is hack! magic function
      this.$nextTick(() => {
        this.notify({value, isValid})
      })
    },
    // 失去焦点时进行判断
    handleBlur() {
      let originValue = this.version || ''

      /**
       * 如果是不完全输入，会自动填充
       */
      // 依次寻找匹配自动填充的规则
      let matchPaddingRegular = this.autoPaddingRegularList.find(item => {
        return item.regular.test(originValue)
      })

      // 如果需要自动填充,且存在可以满足的自动填充，则自动填充后续字符串
      if (this.autoPadding && matchPaddingRegular) {
        let paddedValue = originValue + matchPaddingRegular.padding

        // 自动补齐后可能会出现版本0.0.0, 将0.0.0替换为默认版本
        paddedValue = paddedValue.replace(NONSENSE_VERSION, MIN_VERSION)

        // 如果需要前缀，且没有输入前缀v，自动添加前缀
        paddedValue =
          this.prefix && !paddedValue.startsWith(v)
            ? v + paddedValue
            : paddedValue

        this.notify({
          value: paddedValue
        })

        return
      }

      /**
       * 如果是过量输入，会自动截取
       */
      // 尝试寻找可以自动fix的规则
      let matchFixRegular = autoFixRegular.find(item => {
        return item.regular.test(originValue)
      })
      // 满足条件则autoFix
      if (matchFixRegular) {
        let fixValue = matchFixRegular.fixStr(originValue)

        this.notify({
          value: fixValue
        })
        return
      }

      // 格式不对重置输入框
      if (!this.checkVersionVaild(originValue)) {
        this.setDefaultVersion()
      }
    },
    updateValue(value) {
      /**
       * @property {string} value - 输入框最新的值
       */
      this.$emit('input', value)
    },
    updateValid(isValid) {
      /**
       * 最新值是否符合校验规则
       * @property {boolean} isValid
       */
      this.$emit('validChange', isValid)
      this.isValid = isValid
    },
    // 对外通知
    notify({value, isValid = true}) {
      this.updateValue(value)
      this.updateValid(isValid)
    },
    checkVersionVaild(version = '') {
      // 不允许 0.0.0
      return (
        version.split('.').some(item => item != 0) &&
        this.validRegular.test(version)
      )
    },
    // 重置value为默认版本（如失去焦点时若格式不对）
    setDefaultVersion() {
      this.notify({
        value: this.prefix ? v + DEFAULT_VERSION : DEFAULT_VERSION
      })
    }
  }
}
</script>

