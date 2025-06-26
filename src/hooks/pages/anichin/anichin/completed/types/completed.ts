export interface CompletedDonghua {
  title: string;
  poster: string;
  anichinId: string;
  href: string;
  anichinUrl: string;
  type: string;
  status: string;
  episode: string;
  quality: string;
}

export interface Pagination {
  currentPage: number;
  hasPrevPage: boolean;
  prevPage: number | null;
  hasNextPage: boolean;
  nextPage: number | null;
  totalPages: number;
}

export interface CompletedDonghuaResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    animeList: CompletedDonghua[];
  };
  pagination: Pagination;
}
