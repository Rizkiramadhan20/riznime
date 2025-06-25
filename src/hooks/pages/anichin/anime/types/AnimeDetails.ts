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
  data: AnimeData;
  pagination: null | unknown;
}

export interface DetailsAnimeProps {
  params: {
    slug: string;
  };
}
