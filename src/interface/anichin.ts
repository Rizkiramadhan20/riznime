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

export interface ScheduleResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    days: DaySchedule[];
  };
  pagination: null;
}

export interface DaySchedule {
  day: string;
  animeList: AnimeSchedule[];
}

export interface AnimeSchedule {
  anichinId: string;
  title: string;
  poster?: string;
  href: string;
  episode: string;
  quality: string;
  releaseTime: string;
  otakudesuUrl: string;
}

export interface Donghua {
  title: string;
  poster: string;
  type: string;
  anichinId: string;
  href: string;
  anichinUrl: string;
  status: string;
  episode: string;
  quality: string;
}

export interface DonghuaContentProps {
  anichinData: {
    animeList: Donghua[];
    pagination: {
      currentPage: number;
      hasPrevPage: boolean;
      prevPage: number | null;
      hasNextPage: boolean;
      nextPage: number | null;
      totalPages: number;
    };
  };
}

export interface DonghuaListResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    animeList: Donghua[];
  };
  pagination: {
    currentPage: number;
    hasPrevPage: boolean;
    prevPage: number | null;
    hasNextPage: boolean;
    nextPage: number | null;
    totalPages: number;
  };
}

export interface GenreAnichinListResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    animeList: GenreAnichin[];
  };
  pagination: {
    currentPage: number;
    hasPrevPage: boolean;
    prevPage: number | null;
    hasNextPage: boolean;
    nextPage: number | null;
    totalPages: number;
  };
}

export interface GenreAnichin {
  title: string;
  poster: string;
  anichinId: string;
  href: string;
  anichinUrl: string;
  type: string;
  episode: string;
  quality: string;
}
