import { Observable } from "rxjs";

export interface UserAuth0{
    isAuthenticated: boolean;
    profile: User;
}

export interface User{
  usu_co_usuario: number,
  usu_no_usuario: string,
  usu_no_email: string,
  usu_co_usuario_temp: number,
  usu_ft_url?: string
}

export interface NxtAuth0{
  setFullDataUser(): Promise<any>;
  user$: Observable<UserAuth0>;
  setUserBS(user: UserAuth0): any;
  triggerSubject$: Observable<any>;
  setAnyBS(value: any): any;
}
