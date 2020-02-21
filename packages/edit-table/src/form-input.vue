<template>
  <el-form-item
    class="form-input"
    :class="[`form-input-${column.id}`, {'form-input--readonly': readonly}]"
    v-bind="$attrs"
    :prop="`data.${index}.${column.id}`"
  >
    <component v-if="readonly" :is="readonlyComponent" />
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
import { isFunction, isObject } from 'element-ui/src/utils/types';
import { isVNode } from 'element-ui/src/utils/vdom';

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
    readonlyComponent() {
      let cellValue = this.data[this.column.id];

      let Component = {
        render: h => h('p', null, cellValue)
      };

      if (isFunction(this.column.formatter)) {
        const formatted = this.column.formatter(this.data, cellValue, this.index);

        if (isVNode(formatted)) {
          Component = { render: h => formatted };
        } else if (isObject(formatted)) {
          Component = formatted;
        } else {
          cellValue = formatted;
        }
      }

      return Component;
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
