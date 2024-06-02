import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep',
  standalone: true,
})
export class CEPPipe implements PipeTransform {
  transform(value: string): string {
    if(!value) {
      return '';
    } else if (value.length !== 8) {
      return value.replace(/[^\d]/g, '') || '';
    } else {
      return value.replace(/(\d{5})(\d{3})/g, '$1-$2');
    }
  }
}

