import FormTable from './src/main';

/* istanbul ignore next */
FormTable.install = function(Vue) {
  Vue.component(FormTable.name, FormTable);
};

export default FormTable;
