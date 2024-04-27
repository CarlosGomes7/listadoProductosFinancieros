import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateListProduct',
  standalone: true
})
export class DateListProductPipe implements PipeTransform {

  transform(value: Date): string {
    const date = new Date(value);
    if (!value) return '';
    return date.toISOString().slice(0,10);
  }

}
