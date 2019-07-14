import {uniqueId} from '~/utils';

describe('Utils: uniqueId', () => {
  it('should always return unique value', () => {
    const id1 = uniqueId();
    const id2 = uniqueId();

    expect(id1).not.toBe(id2);
  });
});
