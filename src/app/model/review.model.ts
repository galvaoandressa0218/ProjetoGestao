// Interface para um Review completo
export interface Review {
  id: number;
  titulo: string;
  AutorDoTrabalho: string;
  AutorResenha: string;
  AreaDeConhecimento: string;
  conteudo: string;
}

// Interface para os dados de um *novo* review (sem o 'id')
export type NewReviewData = Omit<Review, 'id'>;