import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, lastValueFrom } from 'rxjs';
import { AuthService  } from '@auth0/auth0-angular';
import { UserAuth0, User } from './nxt-auth0.interface';
import { NxtUserService } from '../nxt-user/nxt-user.service';
import { UserService } from '../nxt-user/nxt-user.interface';

@Injectable({
  providedIn: 'root',
})
export class NxtAuth0Service {
  private userService: UserService = inject(NxtUserService);

  private userSubject: BehaviorSubject<UserAuth0>;
  private triggerSubject: BehaviorSubject<any>;

  public readonly user$: Observable<UserAuth0>;
  public readonly triggerSubject$: Observable<any>;


  private authService: AuthService = inject(AuthService);

  constructor() {
    this.userSubject = new BehaviorSubject<UserAuth0>({isAuthenticated: false} as UserAuth0);
    this.user$ = this.userSubject.asObservable();

    this.triggerSubject = new BehaviorSubject<any>(null);
    this.triggerSubject$ = this.triggerSubject.asObservable();
  }

  setFullDataUser(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.authService.user$.subscribe(async (user: any) => {
        if (user && user.sub) {
          let dataUser;
          const dataUserDb = await lastValueFrom(this.userService.getUsuario(user.sub).pipe(
            catchError(error => {
              return error;
            })
          ))
          dataUser = dataUserDb[0]

          if(dataUserDb.length == 0){
            dataUser = {
              usu_no_usuario: user.nickname,
              usu_no_email: user.email,
              usu_co_usuario: user.sub.split('|')[1].replace(/[^\d]/g, '')
            };

            const postUser = await lastValueFrom(this.userService.postUsuario(user).pipe(
              catchError(error => error)
            ));
          }
          dataUser.usu_co_usuario_temp = this.getUserFromLocalStorage();

          let userFull: UserAuth0 = {
            isAuthenticated: true,
            profile: dataUser
          }

          this.setUserBS(userFull);

        } else {
          user = this.getUserFromLocalStorage()

          let userFull: UserAuth0 = {
            isAuthenticated: false,
            profile: {
              usu_co_usuario: user,
              usu_co_usuario_temp: user
            } as User
          }

          this.setUserBS(userFull);
        }
        resolve();
      });
    });
  }


  setUserBS(user: any) {
    this.userSubject.next(user);
  }

  setAnyBS(value: any){
    this.triggerSubject.next(value)
  }

  getUserFromLocalStorage() {
    let user = JSON.parse(localStorage.getItem('user') ?? JSON.stringify('{id: null}'));
    if(user.id){
      return user?.id;
    }else{
      let user = this.genRandomUserId();
      localStorage.setItem('user', JSON.stringify({id: user}));
      return user
    }
  }

  genRandomUserId(): string{
    let user = ''
    for (let i = 0; i < 5; i++) {
      user += `${Math.floor(Math.random() * (100 - 0 + 1)) + 0}`
    }
    return user;
  }

}
