<template>
  <li class="el-timeline-item">
    
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
    ></el-timeline-dot>
    <div v-if="$slots.dot && timeline.direction==='vertical'" class="el-timeline-item__dot">
      <slot name="dot"></slot>
    </div>

    <component :is="renderTimelineWrapper"></component>
  </li>
</template>

<script>
import ElTimelineDot from './dot';
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

  computed: {
    renderTimelineStroke() {
      const slotDot = this.$slots.dot;
      const { type, color, icon } = this;
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
            ></el-timeline-dot>
          )}
        </div>
      );
    },

    renderTimelineWrapper() {
      const slotDefault = this.$slots.default;
      const direction = this.timeline.direction;
      const { hideTimestamp, placement, timestamp } = this;
      const timestampContent =
        hideTimestamp || placement === 'left' ? (
          ''
        ) : (
          <div class={'el-timeline-item__timestamp is-' + placement}>
            {timestamp}
          </div>
        );
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
  }
};
</script>
