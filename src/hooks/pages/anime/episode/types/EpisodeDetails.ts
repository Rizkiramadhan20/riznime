export interface Genre {
  title: string;
  genreId: string;
  href: string;
  otakudesuUrl: string;
}

export interface Episode {
  title: number;
  episodeId: string;
  href: string;
  otakudesuUrl: string;
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

export interface AnimeInfo {
  credit: string;
  encoder: string;
  duration: string;
  type: string;
  genreList: Genre[];
  episodeList: Episode[];
}

export interface EpisodeData {
  title: string;
  animeId: string;
  episodeId: string;
  releaseTime: string;
  defaultStreamingUrl: string;
  hasPrevEpisode: boolean;
  prevEpisode: Episode | null;
  hasNextEpisode: boolean;
  nextEpisode: Episode | null;
  server: {
    qualities: Quality[];
  };
  downloadUrl: {
    qualities: DownloadQuality[];
  };
  info: AnimeInfo;
  poster: string;
  recommendedAnimeList?: RecommendedAnime[];
}

export interface ApiResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: EpisodeData;
  pagination: null | unknown;
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

//

export interface Genre {
  title: string;
  genreId: string;
  href: string;
  otakudesuUrl: string;
}

export interface Episode {
  title: number;
  episodeId: string;
  href: string;
  otakudesuUrl: string;
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
  otakudesuUrl: string;
}

export interface AnimeData {
  title: string;
  poster: string;
  japanese: string;
  english?: string;
  score: string;
  producers: string;
  status: string;
  episodes: number;
  duration: string;
  aired: string;
  studios: string;
  batch: string | null;
  synopsis: SynopsisData;
  genreList: Genre[];
  episodeList: Episode[];
  recommendedAnimeList: RecommendedAnime[];
}

export interface DetailsAnimeContentProps {
  animeData: AnimeData;
}

//

export interface Genre {
  title: string;
  genreId: string;
  href: string;
  otakudesuUrl: string;
}

export interface Episode {
  title: number;
  episodeId: string;
  href: string;
  otakudesuUrl: string;
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
  otakudesuUrl: string;
}

export interface AnimeData {
  title: string;
  poster: string;
  japanese: string;
  english?: string;
  score: string;
  producers: string;
  status: string;
  episodes: number;
  duration: string;
  aired: string;
  studios: string;
  batch: string | null;
  synopsis: SynopsisData;
  genreList: Genre[];
  episodeList: Episode[];
  recommendedAnimeList: RecommendedAnime[];
}

export interface ApiResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: EpisodeData;
  pagination: null | unknown;
}

export interface DetailsAnimeProps {
  params: {
    slug: string;
  };
}
