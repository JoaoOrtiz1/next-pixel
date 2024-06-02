import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NxtRouterService {
  protected router = inject(Router)

  navigateTo(path: string, params: any): any{
    this.router.navigate([`${path}`], {state: params});
  }

}
