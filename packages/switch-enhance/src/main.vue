<template>
  <div class="el-switch-enhance">
    <el-switch
      :class="[{'square': square}, {'inline-text': inlineText}]"
      v-bind="$attrs"
      v-model="value"
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
    }
  },
  data() {
    return {
      value: this.$attrs.value
    };
  }
};
</script>
