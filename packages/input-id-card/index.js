import InputIdCard from './src/main';

/* istanbul ignore next */
InputIdCard.install = function(Vue) {
  Vue.component(InputIdCard.name, InputIdCard);
};

export default InputIdCard;
