export interface Product{
    prod_co_produto: number;
    prod_no_produto: string;
    prod_vl_preco: number;
    prod_tx_descricao: string;
    prod_dt_cadastro: string;
    prod_path_url_thumbnail: string;
    prod_url_3d: string;
    show_iframe: boolean;
    prod_qt_produto: number;
    endc: string;
}

export interface ProductFilter extends ProductFilterBase{
    prod_no_produto: string;
    prod_vl_preco_min: number;
    prod_vl_preco_max: number;
    prod_dt_cadastro_ini: string;
    prod_dt_cadastro_fim: string;
    prod_in_status: string;
}

export interface ProductFilterBase {
  first: number;
  rows: number;
  total_records: number;
}
