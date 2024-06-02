export interface Endereco{
  usu_co_usuario: number,
  endc_co_endereco: number,
  endc_co_cep: string,
  endc_co_estado: string,
  endc_nu_cidade: string,
  endc_nu_numero: number,
  endc_no_apelido: string,
  endc_no_bairro: string,
  endc_no_rua: string,
  endc_no_recebe: string
}

export interface EnderecoFull extends Endereco{
  endc_no_rua: string;
  endc_no_bairro: string;
}

export interface EnderecoAutoComplete{
  optionLabel: string,
  optionValue: string,
  optionLabelSimple: string
}
