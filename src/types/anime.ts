export interface Anime {
  title: string;
  poster: string;
  episodes: number;
  releaseDay?: string;
  latestReleaseDate?: string;
  score?: string;
  lastReleaseDate?: string;
  animeId: string;
  href: string;
  otakudesuUrl: string;
}

export interface AnimeList {
  href: string;
  otakudesuUrl: string;
  animeList: Anime[];
}

export interface AnimeData {
  ongoing: AnimeList;
  completed: AnimeList;
}

// Search

export interface AnimeGenre {
  title: string;
  genreId: string;
  href: string;
  samehadakuUrl: string;
}

export interface AnimeResult {
  title: string;
  poster: string;
  type: string;
  score: string;
  status: string;
  animeId: string;
  href: string;
  samehadakuUrl: string;
  genreList: AnimeGenre[];
}

export interface SearchResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    animeList: AnimeResult[];
  };
  pagination: {
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
    totalPages: number;
  };
}
