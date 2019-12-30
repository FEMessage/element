import { createTest, destroyVM } from '../util';
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
});

