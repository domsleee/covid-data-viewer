import { WrappedDatePipe } from './wrapped-date.pipe';

describe('WrappedDatePipe', () => {
  it('create an instance', () => {
    const pipe = new WrappedDatePipe();
    expect(pipe).toBeTruthy();
  });
});
