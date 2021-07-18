import { DatePipe } from '@angular/common';
import { PipeTransform } from '@angular/core';

export class WrappedDatePipe implements PipeTransform {
  innerPipe: DatePipe;
  format: string;

  constructor(format: string) {
    this.format = format;
    this.innerPipe = new DatePipe('en-AU');
  }

  transform(value: Date, ...args: unknown[]): unknown {
   return this.innerPipe.transform(value, this.format);
  }

}
