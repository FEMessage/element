import { createTest, destroyVM } from '../util';
import FormTable from 'packages/form-table';

describe('FormTable', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(FormTable, true);
    expect(vm.$el).to.exist;
  });
});

