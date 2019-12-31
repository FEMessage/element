import { createTest, createVue, destroyVM } from '../util';
import SwitchEnhance from 'packages/switch-enhance';

describe('SwitchEnhance', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(SwitchEnhance, true);
    expect(vm.$el).to.exist;
  });

  it('update value', done => {
    vm = createVue({
      template: '<el-switch-enhance v-model="value" />',
      data() {
        return {
          value: true
        };
      }
    }, true);

    const core = vm.$el.querySelector('.el-switch__core');
    core.click();

    setTimeout(() => {
      expect(vm.value).to.equal(true);
      done();
    }, 10);
  });

  it('change event', done => {
    vm = createVue({
      template: '<el-switch-enhance v-model="value" />',
      mounted() {
        setTimeout(() => {
          this.value = false;
        }, 10);
      },
      methods: {
        handleChange(val) {
          this.target = val;
        }
      },
      data() {
        return {
          target: 1,
          value: true
        };
      }
    }, true);

    expect(vm.target).to.equal(1);
    done();
  });
});

