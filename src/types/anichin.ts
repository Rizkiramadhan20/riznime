export interface AnichinResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: AnichinData;
}

export interface AnichinData {
  ongoing: AnimeSection;
  latestRelease: AnimeSection;
  popular: AnimeSection;
  update: UpdateSection;
}

export interface AnimeSection {
  href: string;
  anichinUrl: string;
  anichinList: AnimeItem[];
}

export interface UpdateSection {
  href: string;
  anichinUrl: string;
  anichinList: UpdateItem[];
}

export interface AnimeItem {
  title: string;
  poster: string;
  anichinId: string;
  href: string;
  anichinUrl: string;
  type: string;
  episode: string;
  quality: string;
}

export interface UpdateItem {
  title: string;
  poster: string;
  anichinId: string;
  href: string;
  anichinUrl: string;
  synopsis: string;
}

// Search types
export interface DonghuaGenre {
  title: string;
  genreId: string;
  href: string;
  anichinUrl: string;
}

export interface DonghuaResult {
  title: string;
  poster: string;
  type: string;
  score: string;
  status: string;
  anichinId: string;
  href: string;
  anichinUrl: string;
  genreList: DonghuaGenre[];
}
