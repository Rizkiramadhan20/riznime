export interface Genre {
  title: string;
  genreId: string;
  href: string;
  anichinUrl: string;
}

export interface Episode {
  title: string;
  episodeNumber: number;
  episodeId: string;
  href: string;
  anichinUrl: string;
}

export interface Server {
  title: string;
  serverId: string;
  href: string;
}

export interface Quality {
  title: string;
  serverList: Server[];
}

export interface DownloadUrl {
  title: string;
  url: string;
}

export interface DownloadQuality {
  title: string;
  size: string;
  urls: DownloadUrl[];
}

export interface SynopsisData {
  paragraphs: string[];
  connections: unknown[];
}

export interface RecommendedAnime {
  title: string;
  poster: string;
  animeId: string;
  href: string;
  anichinUrl: string;
}

export interface PopularSeriesItem {
  title: string;
  poster: string;
  anichinId: string;
  href: string;
  anichinUrl: string;
  genres: string[];
  score: string;
  rank: number;
}

export interface PopularSeries {
  weekly: PopularSeriesItem[];
  monthly: PopularSeriesItem[];
  allTime: PopularSeriesItem[];
  movies: PopularSeriesItem[];
}

export interface EpisodeData {
  title: string;
  anichinId: string;
  japanese: string;
  score: string;
  status: string;
  producers: string;
  studios: string;
  aired: string;
  duration: string;
  type: string;
  episodes: number;
  season: string;
  country: string;
  poster: string;
  synopsis: SynopsisData;
  genreList: Genre[];
  episodeList: Episode[];
  recommendedAnimeList: RecommendedAnime[];
  server: {
    qualities: Quality[];
  };
  downloadUrl: {
    qualities: DownloadQuality[];
  };
  popularSeries?: PopularSeries;
  releaseTime?: string;
  hasPrevEpisode?: boolean;
  prevEpisode?: Episode | null;
  hasNextEpisode?: boolean;
  nextEpisode?: Episode | null;
  defaultStreamingUrl?: string;
  credit?: string;
  encoder?: string;
}

export interface ApiResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: EpisodeData;
  pagination?: null | unknown;
}

export interface DetailsEpisodeProps {
  params: {
    slug: string;
  };
}

export interface DetailsEpisodeContentProps {
  episodeData: EpisodeData;
  slug: string;
}
