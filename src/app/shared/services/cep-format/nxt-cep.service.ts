import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NxtCepFormatService {

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
