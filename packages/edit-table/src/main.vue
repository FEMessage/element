<template>
  <el-form class="el-edit-table" :class="{'el-edit-table-readonly': readonly}" ref="form" :model="model">
    <el-table ref="table" :data="model.data" v-bind="tableAttrs">
      <slot></slot>
      <el-table-column
        v-for="(column, index) in columns"
        :key="index"
        :label="column.label"
        :prop="column.id"
        v-bind="column.columnAttrs"
      >
        <template slot="header" slot-scope="scope">
          <slot :name="`header:${column.id}`" :column="column">{{ scope.column.label }}</slot>
          <span v-if="hasRequired(columns[index].rules)" class="required">*</span>
        </template>
        <template slot-scope="scope">
          <form-input
            :index="scope.$index"
            :column="column"
            :data="scope.row"
            :rules="column.rules"
            :options="createOptions(column.id, scope.$index)"
            :readonly="isReadOnly(column)"
          ></form-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-bind="operationAttrs" v-if="!readonly && hasOperation">
        <el-form-item slot-scope="scope">
          <span @click="deleteRow(scope.row, scope.$index)">
            <slot name="delete" :disabled="value.length >= maxCount">
              <el-button class="danger-button" type="text" :disabled="value.length <= minCount">删除</el-button>
            </slot>
          </span>
        </el-form-item>
      </el-table-column>
    </el-table>
    <span @click="addRow" v-if="!readonly && hasOperation">
      <slot name="add" :disabled="value.length >= maxCount">
        <el-button type="text" :disabled="value.length >= maxCount">
          添加
        </el-button>
      </slot>
    </span>
  </el-form>
</template>

<script>
import { isString, isUndefined } from 'element-ui/src/utils/types';

import FormInput from './form-input.vue';

export default {
  name: 'ElEditTable',
  components: {
    FormInput
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    readonly: {
      type: [Boolean, undefined],
      default: undefined
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: Infinity
    },
    hasOperation: {
      type: Boolean,
      default: true
    },
    tableAttrs: {
      type: Object,
      default: () => ({})
    },
    operationAttrs: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      currentKey: 0,
      indexKeys: [],
      commonOptionsData: {},
      rowOptionsData: {}
    };
  },

  computed: {
    basicData() {
      const data = {};
      this.columns.forEach(column => {
        data[column.id] = 'default' in column ? column.default : '';
      });
      return data;
    },

    model() {
      return {
        data: this.value
      };
    },

    createOptions() {
      // 对于 select 这样的组件，可以统一设置 options，也可以对一行单独设置
      return (id, index) => {
        const rowOptions = this.rowOptionsData[`${id}-${this.indexKeys[index]}`] || [];

        // 判断是否存在单独设置的 options
        if (rowOptions.length > 0) {
          return rowOptions;
        } else {
          return this.commonOptionsData[id];
        }
      };
    },

    isReadOnly() {
      return column => isUndefined(this.readonly) ? !!column.readonly : this.readonly;
    },

    minCount() {
      return this.min < 1 ? 1 : this.min;
    },

    maxCount() {
      return this.max < this.minCount ? this.minCount : this.max;
    }
  },

  beforeMount() {
    let initLen = this.value.length;
    if (initLen < this.minCount) {
      initLen = this.minCount;
    } else if (initLen > this.maxCount) {
      initLen = this.maxCount;
    }
    const values = [];
    for (let i = 0; i < initLen; i++) {
      const value = this.value[i] || {};
      this.addIndexKey();
      values.push(Object.assign({}, this.basicData, value));
    }
    this.$emit('input', values);
    this.columns.forEach(column => {
      if (column.options) {
        this.commonOptionsData[column.id] = column.options;
      }
    });
  },

  methods: {
    hasRequired(rules) {
      if (Array.isArray(rules)) {
        return rules.some(rule => rule.required);
      }
      return false;
    },
    addIndexKey() {
      this.indexKeys.push(this.currentKey);
      this.currentKey++;
    },

    deleteRow(row, index) {
      if (this.value.length <= this.minCount) {
        return;
      }
      const deleteIndex = () => {
        this.deleteRowOptions(index);
        this.$emit(
          'input',
          this.model.data.filter((item, i) => i !== index)
        );
        this.$emit('delete', row, index);
      };
      if (Object.keys(row).some(key => row[key] !== this.basicData[key])) {
        this.$confirm('确认删除该行数据吗？').then(deleteIndex);
      } else {
        deleteIndex();
      }
    },

    addRow() {
      if (this.value.length >= this.maxCount) {
        return ;
      }
      this.addIndexKey();
      this.$emit('input', this.model.data.concat([{ ...this.basicData }]));
    },

    deleteRowOptions(index) {
      Object.keys(this.rowOptionsData).forEach(key => {
        if (+key.split('-')[1] === this.indexKeys[index]) {
          delete this.rowOptionsData[key];
        }
      });
      this.indexKeys = this.indexKeys.filter((indexKey, i) => i !== index);
    },

    setOptions(id, options, index = -1) {
      if (index > -1) {
        // 单独设置一行options
        this.$set(
          this.rowOptionsData,
          `${id}-${this.indexKeys[index]}`,
          options
        );
      } else {
        // 设置所有行的options
        this.$set(this.commonOptionsData, id, options);
        Object.keys(this.rowOptionsData).forEach(key => {
          if (key.split('-')[0] === id) {
            delete this.rowOptionsData[key];
          }
        });
      }
    },

    validate(callback) {
      return this.$refs.form.validate(callback);
    },
    clearValidate(props, rowIndexes) {
      const clearValidate = this.$refs.form.clearValidate;
      const getAllProps = (prop) => {
        const allProps = [];
        const len = rowIndexes ? rowIndexes.length : this.value.length;
        for (let i = 0; i < len; i++) {
          const index = rowIndexes ? rowIndexes[i] : i;
          allProps.push(`data.${index}.${prop}`);
        }
        return allProps;
      };
      if (props && Array.isArray(props)) {
        return clearValidate(props.reduce((prev, prop) => {
          return prev.concat(getAllProps(prop, rowIndexes));
        }, []));
      }
      if (isString(props)) {
        return clearValidate(getAllProps(props, rowIndexes));
      }
      return clearValidate(props);
    }
  }
};
</script>
