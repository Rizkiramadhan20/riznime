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

export interface OngoingMangaResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    animeList: OngoingManga[];
  };
  pagination: null;
}

export interface Genre {
  title: string;
  genreId: string;
  href: string;
  komikuUrl: string;
}

export interface GenreResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    genreList: Genre[];
  };
}
