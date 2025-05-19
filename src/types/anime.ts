export interface Anime {
  title: string;
  poster: string;
  animeId: string;
  episodes?: number | string;
  releaseDay?: string;
  latestReleaseDate?: string;
  score?: string;
  href: string;
  otakudesuUrl?: string;
}

export interface AnimeList {
  href: string;
  otakudesuUrl: string;
  animeList: Anime[];
}

export interface Genre {
  title: string;
  genreId: string;
  href: string;
  otakudesuUrl: string;
}

export interface Episode {
  title: number | string;
  episodeId: string;
  href: string;
  otakudesuUrl: string;
}

export interface RecommendedAnime {
  title: string;
  poster: string;
  animeId: string;
  href: string;
  otakudesuUrl: string;
}

export interface AnimeData {
  title: string;
  poster: string;
  japanese?: string;
  score?: string;
  producers?: string;
  status?: string;
  episodes?: number | string;
  duration?: string;
  aired?: string;
  studios?: string;
  batch?: string | null;
  synopsis?: {
    paragraphs: string[];
    connections: unknown[];
  };
  genreList?: Genre[];
  episodeList?: Episode[];
  recommendedAnimeList?: RecommendedAnime[];
}

// Search types
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

export interface OngoingAnimeList {
  href: string;
  otakudesuUrl: string;
  animeList: {
    title: string;
    poster: string;
    episodes: number;
    releaseDay: string;
    latestReleaseDate: string;
    score: string;
    animeId: string;
    href: string;
    otakudesuUrl: string;
  }[];
}

export interface CompletedAnimeList {
  href: string;
  otakudesuUrl: string;
  animeList: {
    title: string;
    poster: string;
    episodes: number;
    score: string;
    lastReleaseDate: string;
    animeId: string;
    href: string;
    otakudesuUrl: string;
  }[];
}

export interface AnimeListResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    ongoing: OngoingAnimeList;
    completed: CompletedAnimeList;
  };
  pagination: null;
}

export interface GenresData {
  title: string;
  genreId: string;
  href: string;
  otakudesuUrl: string;
}

export interface GenresList {
  href: string;
  otakudesuUrl: string;
  genreList: GenresData[];
}
