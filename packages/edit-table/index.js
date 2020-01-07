import EditTable from './src/main';

/* istanbul ignore next */
EditTable.install = function(Vue) {
  Vue.component(EditTable.name, EditTable);
};

export default EditTable;
