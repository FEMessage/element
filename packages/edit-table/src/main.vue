<template>
  <el-form class="el-edit-table" ref="form" :model="model">
    <el-table ref="table" :data="model.data">
      <el-table-column
        v-for="(column, index) in columns"
        :key="index"
        :label="column.label"
        :prop="column.id"
        v-bind="column.columnAttrs"
      >
        <template slot="header" slot-scope="scope">
          {{ scope.column.label }}
          <span v-if="hasRequired(columns[scope.$index].rules)" class="required"
            >*</span
          >
        </template>
        <template slot-scope="scope">
          <form-input
            :index="scope.$index"
            :column="column"
            :data="scope.row"
            :rules="rules[column.id]"
            :options="createOptions(column.id, scope.$index)"
          ></form-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-form-item slot-scope="scope">
          <span @click="deleteRow(scope.row, scope.$index)">
            <slot name="delete">
              <el-button class="danger-button" type="text">删除</el-button>
            </slot>
          </span>
        </el-form-item>
      </el-table-column>
    </el-table>
    <span @click="addRow">
      <slot name="add">
        <el-button type="text">
          添加
        </el-button>
      </slot>
    </span>
  </el-form>
</template>

<script>
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

    rules() {
      const rules = {};
      this.columns.forEach(column => {
        if (column.rules) {
          rules[column.id] = column.rules;
        }
      });
      return rules;
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
    }
  },

  beforeMount() {
    if (!this.value.length) {
      this.addIndexKey();
      this.$emit('input', [{ ...this.basicData }]);
    } else {
      this.$emit(
        'input',
        this.value.map(data => {
          this.addIndexKey();
          return Object.assign({}, this.basicData, data);
        })
      );
    }
    this.columns.forEach(column => {
      if (column.options) {
        this.commonOptionsData[column.id] = column.options;
      }
    });
  },

  methods: {
    hasRequired(rules) {
      if (rules && rules.required) {
        return true;
      }
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
      if (this.value.length < 2) {
        this.$message.error('不能删除最后一条数据');
        return;
      }
      const deleteIndex = () => {
        this.deleteRowOptions(index);
        this.$emit(
          'input',
          this.model.data.filter((item, i) => i !== index)
        );
      };
      if (Object.keys(row).some(key => row[key] !== this.basicData[key])) {
        this.$confirm('确认删除该行数据吗？').then(deleteIndex);
      } else {
        deleteIndex();
      }
    },

    addRow() {
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
    }
  }
};
</script>
