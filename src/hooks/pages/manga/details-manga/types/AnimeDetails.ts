export interface Genre {
  title: string;
  genreId: string;
  href: string;
  komikuUrl: string;
}

export interface Chapter {
  title: string;
  chapterId: string;
  href: string;
  komikuUrl: string;
  views: number;
  releaseDate: string;
}

export interface SynopsisData {
  paragraphs: string[];
  images: string[];
}

export interface SimilarManga {
  title: string;
  poster: string;
  mangaId: string;
  href: string;
  komikuUrl: string;
  type: string;
  views: string;
  description: string;
}

export interface MangaData {
  title: string;
  poster: string;
  status: string;
  synopsis: SynopsisData;
  genreList: Genre[];
  indonesianTitle: string;
  mangaType: string;
  author: string;
  readerAge: string;
  readingDirection: string;
  firstChapter: string;
  latestChapter: string;
  chapterList: Chapter[];
  similarMangaList: SimilarManga[];
}

export interface DetailsMangaContentProps {
  mangaData: MangaData;
}

export interface ApiResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: MangaData;
  pagination: null;
}

export interface DetailsMangaProps {
  params: {
    slug: string;
  };
}
