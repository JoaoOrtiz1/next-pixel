import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: "formatarTimestampDMY",
    standalone: true,
  })
export class FormatarTimestampPipeDMY implements PipeTransform {
    transform(dataString: string): string {
        const data = new Date(dataString);

        const dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = String(data.getUTCFullYear())//.slice(-2);

        const hora = String(data.getUTCHours()).padStart(2, '0');
        const minutos = String(data.getUTCMinutes()).padStart(2, '0');
        // const segundos = String(data.getSeconds()).padStart(2, '0');

        return `${dia}/${mes}/${ano}`//- ${hora}:${minutos}`//:${segundos}`;
    }
}
