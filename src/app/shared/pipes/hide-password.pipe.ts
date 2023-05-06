import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hidePassword'
})
export class HidePasswordPipe implements PipeTransform {

  transform(value: string, hide = true): unknown {
    return hide  ? value?.replace(/./g, '*') : value;
  }

}
