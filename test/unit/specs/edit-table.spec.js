import { createTest, destroyVM } from '../util';
import EditTable from 'packages/edit-table';

describe('EditTable', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(EditTable, true);
    expect(vm.$el).to.exist;
  });
});

