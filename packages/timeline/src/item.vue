<template>
  <li class="el-timeline-item" :class="[
    'is-' + timeline.direction
  ]">
    
    <div
      v-if="timeline.direction==='vertical'"
      class="el-timeline-item__tail el-timeline-item__vertical"
    ></div>

    <el-timeline-dot
      v-if="!$slots.dot && timeline.direction==='vertical'"
      class="el-timeline-item__vertical"
      :type="type"
      :color="color"
      :icon="icon"
      :size="size"
    ></el-timeline-dot>
    <div v-if="$slots.dot && timeline.direction==='vertical'" class="el-timeline-item__dot">
      <slot name="dot"></slot>
    </div>

    <component :is="renderTimelineWrapper"></component>
  </li>
</template>

<script>
import ElTimelineDot from './dot';
// 不能使用utils的isEqual，会出问题
import isEqual from 'lodash.isequal';
export default {
  name: 'ElTimelineItem',

  inject: ['timeline'],

  components: {
    ElTimelineDot
  },

  props: {
    timestamp: String,

    hideTimestamp: {
      type: Boolean,
      default: false
    },

    placement: {
      type: String,
      default: 'bottom'
    },

    type: String,

    color: String,

    size: {
      type: String,
      default: 'normal'
    },

    icon: String
  },

  data() {
    return {
      defaultContent: null,
      timestampContent: null,
      dotContent: null
    };
  },

  computed: {
    renderTimelineStroke() {
      const slotDot = this.dotContent || this.$slots.dot;
      const { type, color, icon, size } = this;
      return (
        <div class='el-timeline-item__horizontal'>
          <div class='el-timeline-item__tail'></div>
          {slotDot ? (
            <div class='el-timeline-item__dot'>{slotDot}</div>
          ) : (
            <el-timeline-dot
              type={type}
              color={color}
              icon={icon}
              size={size}
            ></el-timeline-dot>
          )}
        </div>
      );
    },

    renderTimeStamp() {
      const slotTimestamp = this.timestampContent || this.$slots.timestamp;
      const { hideTimestamp, placement, timestamp } = this;
      const timestampContent = slotTimestamp || timestamp;
      return hideTimestamp ? '' : (
        <div class={'el-timeline-item__timestamp is-' + placement}>
          {timestampContent}
        </div>
      );
    },

    renderTimelineWrapper() {
      const slotDefault = this.defaultContent || this.$slots.default;
      const direction = this.timeline.direction;
      const { placement } = this;
      const timestampContent = this.renderTimeStamp;
      const renderTimelineStroke = (direction === 'horizontal'
        ? this.renderTimelineStroke
        : '');
      const timelineContent = (
        <div class='el-timeline-item__content'>{slotDefault}</div>
      );
      const contents = [
        timelineContent,
        renderTimelineStroke,
        timestampContent
      ];
      if (placement === 'top') {
        contents.reverse();
      }

      return {
        render() {
          return (
            <div class='el-timeline-item__wrapper'>{contents}</div>
          );
        }
      };
    }
  },

  methods: {
    updateSlotsRender() {
      if (!isEqual(this.$slots.default, this.defaultContent)) {
        this.defaultContent = this.$slots.default;
      }

      if (!isEqual(this.$slots.timestamp, this.timestampContent)) {
        this.timestampContent = this.$slots.timestamp;
      }

      if (!isEqual(this.$slots.dot, this.dotContent)) {
        this.dotContent = this.$slots.dot;
      }
    }
  },

  beforeUpdate() {
    this.updateSlotsRender();
  }
};
</script>
