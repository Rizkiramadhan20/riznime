export interface Genre {
  title: string;
  genreId: string;
  href: string;
  komikuUrl: string;
}

export interface GenreResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    genreList: Genre[];
  };
}
