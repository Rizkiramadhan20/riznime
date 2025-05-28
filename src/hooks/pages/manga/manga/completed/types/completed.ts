export interface CompletedManga {
  title: string;
  poster: string;
  type: string;
  mangaId: string;
  href: string;
  komikuUrl: string;
  views: string;
  description: string;
  firstChapter: string;
  latestChapter: string;
  firstChapterUrl: string;
  latestChapterUrl: string;
  upCount: number;
}

export interface Pagination {
  currentPage: number;
  hasNextPage: boolean;
  nextPage: number;
}

export interface CompletedMangaResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    animeList: CompletedManga[];
  };
  pagination: Pagination;
}
