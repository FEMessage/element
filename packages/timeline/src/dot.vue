<template>
  <div
    class="el-timeline-item__node"
    :class="[
      `el-timeline-item__node--${size || ''}`,
      `el-timeline-item__node--${type || ''}`
    ]"
    :style="{
      backgroundColor: color
    }"
  >
    <i v-if="icon" class="el-timeline-item__icon" :class="icon"></i>
  </div>
</template>

<script>
export default {
  name: 'ElTimelineDot',

  props: {
    size: {
      type: String,
      default: 'normal'
    },

    type: String,

    color: String,

    icon: String
  }
};
</script>
