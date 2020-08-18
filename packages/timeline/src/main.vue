<script>
  export default {
    name: 'ElTimeline',

    props: {
      reverse: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: 'vertical'
      }
    },

    provide() {
      return {
        timeline: this
      };
    },

    render() {
      const reverse = this.reverse;
      const direction = this.direction;
      const classes = {
        'el-timeline': true,
        'is-reverse': reverse,
        'is-horizontal': direction === 'horizontal',
        'is-vertical': direction === 'vertical'
      };
      let slots = this.$slots.default || [];
      if (reverse) {
        slots = slots.reverse();
      }
      return (<ul class={ classes }>
        { slots }
      </ul>);
    }
  };
</script>
