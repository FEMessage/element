<template>
  <el-form-item class="form-input" v-bind="$attrs" :prop="'data.' + index + '.' + column.id">
    <component v-if="column.type" :is="`el-${column.type}`" v-model="data[column.id]" v-bind="column.el" v-on="event(column.on, data)">
      <template v-if="column.type==='select'">
        <el-option v-for="(option,index) in options" :key="index" v-bind="option"></el-option>
      </template>
    </component>
    <component v-if="column.component" :is="column.component" v-model="data[column.id]" v-bind="column.el" v-on="event(column.on, data)" ></component>
  </el-form-item>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    column: {
      type: Object,
      default() {
        return {};
      }
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      options: []
    };
  },
  mounted() {
    this.options = this.column.options || this.options;
  },
  methods: {
    event(on, data) {
      const event = {};
      on && Object.keys(on).forEach(key=>{
        event[key] = (...args) => {
          return on[key]({
            data,
            index: this.index,
            value: this.value,
            prop: this.column.id
          }, ...args);
        };
      });
      return event;
    },
    setOptions(options) {
      this.options = options;
    }
  }
};
</script>
