import { Observable } from "rxjs";

export interface NxtEnderecoAdd{
    postEndereco(
        id: number, 
        cep: number, 
        estado: string, 
        cidade: string, 
        numero: number, 
        apelido: string, 
        bairro: string, 
        recebe: string, 
        rua: string  
    ): Observable<any>;
}