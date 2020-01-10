import { createTest, destroyVM } from '../util';
import ButtonGroupEnhance from 'packages/button-group-enhance';

describe('ButtonGroupEnhance', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(ButtonGroupEnhance, true);
    expect(vm.$el).to.exist;
  });
});

