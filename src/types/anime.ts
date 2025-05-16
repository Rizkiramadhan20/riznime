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
