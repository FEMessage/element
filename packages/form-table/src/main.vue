<template>
  <el-form class="el-form-table" ref="form" :model="model">
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
          ></form-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-form-item slot-scope="scope">
          <el-button class="danger-button" type="text" @click="deleteRow(scope.row,scope.$index)">{{deleteText}}</el-button>
        </el-form-item>
      </el-table-column>
    </el-table>
    <div>
      <el-button type="text" v-bind="addProp" @click="addRow">{{addText}}</el-button>
    </div>
  </el-form>
</template>

<script>
import FormInput from './form-input.vue';
const isNotFalse = [0, '0', false];
export default {
  name: 'ElFormTable',
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
    addProp: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
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
      this.$emit('input', [{...this.basicData}]);
    } else {
      this.$emit('input', this.value.map(data => Object.assign(data, this.basicData)));
    }
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
    deleteRow(row, index) {
      if (this.value.length < 2) {
        this.$message.error('不能删除最后一条数据');
        return ;
      }
      const deleteIndex = () => {
        this.$emit('input', this.model.data.filter((item, i) => i !== index));
      };
      if (Object.keys(row).some(key => row[key] !== this.basicData[key])) {
        this.$confirm('确认删除该行数据吗？').then(deleteIndex);
      } else {
        deleteIndex();
      }
    },
    addRow() {
      this.$emit('input', this.model.data.concat([{...this.basicData}]));
    },
    setOptions(prop, options, index = -1) {
      if (index > -1) {
        const formItem = this.$refs[`formItem-${prop}-${index}`];
        formItem[0] && formItem[0].setOptions(options);
      } else {
        for (let i = 0; i < this.model.data.length; i++) {
          this.setOptions(prop, options, i);
        }
      }
    },
    validate() {
      return this.$refs.form.validate();
    }
  }
};
</script>
