<template>
  <div class="el-switch-enhance">
    <el-switch
      :class="{'square': square, 'inline-text': inlineText}"
      v-bind="$attrs"
      :value="value"
      @input="onInput"
      v-on="$listeners"
    />
  </div>
</template>

<script>
export default {
  name: 'ElSwitchEnhance',
  props: {
    square: {
      type: Boolean,
      default: false
    },
    inlineText: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput(v) {
      this.$emit('input', v);
    }
  }
};
</script>
