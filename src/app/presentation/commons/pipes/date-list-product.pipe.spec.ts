import { DateListProductPipe } from './date-list-product.pipe';

describe('DateListProductPipe', () => {
  it('create an instance', () => {
    const pipe = new DateListProductPipe();
    expect(pipe).toBeTruthy();
  }); 

  it('should transform a date to its ISO string representation', () => {
    const pipe = new DateListProductPipe();
    const testDate = new Date('2024-04-27');
    const transformedValue = pipe.transform(testDate);
    expect(transformedValue).toEqual('2024-04-27');
  });
});
