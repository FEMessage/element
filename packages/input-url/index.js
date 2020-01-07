import InputUrl from './src/main';

/* istanbul ignore next */
InputUrl.install = function(Vue) {
  Vue.component(InputUrl.name, InputUrl);
};

export default InputUrl;
