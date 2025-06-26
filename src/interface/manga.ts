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

// Search types
export interface MangaGenre {
  title: string;
  genreId: string;
  href: string;
  komikuUrl: string;
}

export interface MangaResult {
  title: string;
  poster: string;
  type: string;
  mangaId: string;
  href: string;
  komikuUrl: string;
  description: string;
  latestChapter?: string;
  score?: string;
  status?: string;
  genreList?: MangaGenre[];
}
