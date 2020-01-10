<template>
  <el-form-item
    class="form-input"
    v-bind="$attrs"
    :prop="`data.${index}.${column.id}`"
  >
    <p v-if="disabled">{{text}}</p>
    <component
      v-else-if="column.type"
      :is="`el-${column.type}`"
      :disabled="disabled"
      v-model="data[column.id]"
      v-bind="column.el"
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
      :disabled="disabled"
      v-model="data[column.id]"
      v-bind="column.el"
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
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    text() {
      if (isFunction(this.column.formatter)) {
        return this.column.formatter(this.data, this.column);
      }
      return this.data[this.column.id];
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
                value: this.value,
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
