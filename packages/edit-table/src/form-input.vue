<template>
  <el-form-item
    class="form-input"
    :class="[`form-input-${column.id}`, {'form-input--readonly': readonly}]"
    v-bind="$attrs"
    :prop="`data.${index}.${column.id}`"
  >
    <p v-if="readonly">{{text}}</p>
    <component
      v-else-if="column.type"
      :is="`el-${column.type}`"
      v-model="data[column.id]"
      v-bind="inputAttrs"
      v-on="event(column.on)"
    >
      <template v-if="column.type === 'select'">
        <el-option
          v-for="(option, index) in options"
          :key="index"
          v-bind="option"
        ></el-option>
      </template>
    </component>
    <component
      v-else-if="column.component"
      :is="column.component"
      v-model="data[column.id]"
      v-bind="inputAttrs"
      v-on="event(column.on)"
    ></component>
  </el-form-item>
</template>

<script>
import { isFunction } from 'element-ui/src/utils/types';
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
    },
    options: {
      type: Array,
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    text() {
      if (isFunction(this.column.formatter)) {
        return this.column.formatter(this.data, this.index);
      }
      return this.data[this.column.id];
    },
    inputAttrs() {
      if (isFunction(this.column.el)) {
        return this.column.el(this.data, this.index);
      }
      return this.column.el;
    }
  },
  methods: {
    event(on) {
      const event = {};
      on &&
        Object.keys(on).forEach(key => {
          event[key] = (...args) => {
            return on[key](
              {
                data: this.data,
                index: this.index,
                value: this.data[this.column.id],
                id: this.column.id
              },
              ...args
            );
          };
        });
      return event;
    }
  }
};
</script>
