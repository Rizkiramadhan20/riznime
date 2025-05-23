export interface RecentManga {
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

export interface RecentMangaResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    animeList: RecentManga[];
  };
  pagination: null;
}
