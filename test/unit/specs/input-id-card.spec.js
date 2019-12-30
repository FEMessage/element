import { createTest, destroyVM } from '../util';
import InputIdCard from 'packages/input-id-card';

describe('InputIdCard', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(InputIdCard, true);
    expect(vm.$el).to.exist;
  });
});

