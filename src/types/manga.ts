// Types for Genre Manga List
export interface GenreMangaListResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    komikuList: GenreManga[];
  };
  pagination: {
    currentPage: number;
    hasNextPage: boolean;
    nextPage: number;
  };
}

export interface GenreManga {
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
