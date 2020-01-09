<template>
  <el-form-item
    class="form-input"
    v-bind="$attrs"
    :prop="`data.${index}.${column.id}`"
  >
    <component
      v-if="column.type"
      :is="`el-${column.type}`"
      :disabled="disabled"
      v-model="data[column.id]"
      v-bind="column.el"
      v-on="event(column.on, data)"
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
      v-on="event(column.on, data)"
    ></component>
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
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    disabled() {
      if (typeof this.column.disabled === 'function') {
        return this.column.disabled(this.data);
      }
      return this.column.disabled;
    }
  },
  methods: {
    event(on, data) {
      const event = {};
      on &&
        Object.keys(on).forEach(key => {
          event[key] = (...args) => {
            return on[key](
              {
                data,
                index: this.index,
                value: this.value,
                prop: this.column.id
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
