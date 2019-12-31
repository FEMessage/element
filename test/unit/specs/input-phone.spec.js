import { createTest, destroyVM } from '../util';
import InputPhone from 'packages/input-phone';

describe('InputPhone', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(InputPhone, true);
    expect(vm.$el).to.exist;
  });
});

