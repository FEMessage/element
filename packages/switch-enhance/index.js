import SwitchEnhance from './src/main';

/* istanbul ignore next */
SwitchEnhance.install = function(Vue) {
  Vue.component(SwitchEnhance.name, SwitchEnhance);
};

export default SwitchEnhance;
