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
    animeList: AnimeItem[];
}

export interface UpdateSection {
    href: string;
    anichinUrl: string;
    animeList: UpdateItem[];
}

export interface AnimeItem {
    title: string;
    poster: string;
    animeId: string;
    href: string;
    anichinUrl: string;
    type: string;
    episode: string;
    quality: string;
}

export interface UpdateItem {
    title: string;
    poster: string;
    animeId: string;
    href: string;
    anichinUrl: string;
    synopsis: string;
}
