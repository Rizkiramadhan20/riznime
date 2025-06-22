export interface OngoingManga {
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

export interface PaginationInfo {
  currentPage: number;
  hasNextPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface OngoingMangaResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    komikuList: OngoingManga[];
  };
  pagination: PaginationInfo;
}
