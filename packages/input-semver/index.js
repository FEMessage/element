import InputSemver from './src/input-semver';

/* istanbul ignore next */
InputSemver.install = function(Vue) {
  Vue.component(InputSemver.name, InputSemver);
};

export default InputSemver;
