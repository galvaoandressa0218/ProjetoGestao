export interface PostagemResponse {
  id: number;
  titulo: string;
  conteudo: string;
  dataPublicacao: string;
  criadorNome: string;
  autorObra: string; // ✅ ADICIONE ESTA LINHA
}

export interface NewPostagemData {
  titulo: string;
  conteudo: string;
  autorObra: string; // ✅ ADICIONE ESTA LINHA
  criadorId: number;
}