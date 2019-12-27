import { createTest, destroyVM } from '../util';
import InputSemver from 'packages/input-semver';

describe('InputSemver', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(InputSemver, true);
    expect(vm.$el).to.exist;
  });
});

