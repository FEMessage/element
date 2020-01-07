<template>
  <el-form class="el-edit-table" ref="form" :model="model">
    <el-table ref="table" :data="model.data">
      <el-table-column
        v-for="(column,index) in columns"
        :key="index"
        :label="column.label"
        :prop="column.id"
        v-bind="column.columnAttrs"
      >
        <template slot="header" slot-scope="scope">
          {{scope.column.label}}
          <span v-if="hasRequired(columns[scope.$index].rules)" class="required">*</span>
        </template>
        <template slot-scope="scope">
          <form-input
            :ref="`formItem-${column.id}-${scope.$index}`"
            :index="scope.$index"
            :column="column"
            :data="scope.row"
            :rules="rules[column.id]"
            :common-options="commonOptionsData[column.id]"
            :row-options="rowOptionsData[`${column.id}-${indexKeys[scope.$index]}`]"
          ></form-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-form-item slot-scope="scope">
          <el-button class="danger-button" type="text" v-bind="deleteProp"
           @click="deleteRow(scope.row,scope.$index)">{{deleteText}}</el-button>
        </el-form-item>
      </el-table-column>
    </el-table>
    <div>
      <el-button type="text" v-bind="addProp" @click="addRow">
        <slot name="add">{{addText}}</slot>
      </el-button>
    </div>
  </el-form>
</template>

<script>
import FormInput from './form-input.vue';
const isNotFalse = [0, '0', false];
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
    deleteText: {
      type: String,
      default: '删除'
    },
    addText: {
      type: String,
      default: '添加'
    },
    deleteProp: {
      type: Object,
      default() {
        return {};
      }
    },
    addProp: {
      type: Object,
      default() {
        return {};
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
        data[column.id] = isNotFalse.indexOf(column.default) > -1 ? column.default : column.default || '';
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
    }
  },
  beforeMount() {
    if (!this.value.length) {
      this.addIndexKey();
      this.$emit('input', [{...this.basicData}]);
    } else {
      this.$emit('input', this.value.map(data => {
        this.addIndexKey();
        return Object.assign(data, this.basicData);
      }));
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
        return ;
      }
      const deleteIndex = () => {
        this.deleteRowOptions(index);
        this.$emit('input', this.model.data.filter((item, i) => i !== index));
      };
      if (Object.keys(row).some(key => row[key] !== this.basicData[key])) {
        this.$confirm('确认删除该行数据吗？').then(deleteIndex);
      } else {
        deleteIndex();
      }
    },
    addRow() {
      this.addIndexKey();
      this.$emit('input', this.model.data.concat([{...this.basicData}]));
    },
    deleteRowOptions(index) {
      Object.keys(this.rowOptionsData).forEach(key => {
        if (+key.split('-')[1] === this.indexKeys[index]) {
          delete this.rowOptionsData[key];
        }
      });
      this.indexKeys = this.indexKeys.filter((indexKey, i) =>i !== index);
    },
    setOptions(id, options, index = -1) {
      if (index > -1) {
        // 单独设置一行options
        this.$set(this.rowOptionsData, `${id}-${this.indexKeys[index]}`, options);
      } else {
        // 设置所有行的options
        this.$set(this.commonOptionsData, id, options);
        Object.keys(this.rowOptionsData).forEach(key=>{
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
