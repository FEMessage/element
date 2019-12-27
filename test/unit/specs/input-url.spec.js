import { createTest, destroyVM } from '../util';
import InputUrl from 'packages/input-url';

describe('InputUrl', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(InputUrl, true);
    expect(vm.$el).to.exist;
  });
});

