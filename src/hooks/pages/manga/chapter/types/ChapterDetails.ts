interface ChapterImage {
  src: string;
  alt: string;
  id: string;
  fallbackSrc: string;
}

interface Synopsis {
  paragraphs: string[];
}

interface ChapterData {
  title: string;
  mangaId: string;
  poster: string;
  releasedOn: string;
  synopsis: Synopsis;
  readingDirection: string;
  chapterImages: ChapterImage[];
  totalImages: number;
  chapterNumber: string;
  recommendedChapters: recommendedChapter[];
}

interface recommendedChapter {
  title: string;
  poster: string;
  mangaId: string;
  href: string;
  komikuUrl: string;
  updateStatus: string;
}

interface ChapterDetailsResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: ChapterData;
  pagination: null;
}

interface DetailsMangaProps {
  params: {
    slug: string;
  };
}

interface DetailsChapterContentProps {
  mangaData: ChapterData;
}

type ApiResponse = ChapterDetailsResponse;

export type {
  ChapterDetailsResponse,
  ChapterData,
  ChapterImage,
  Synopsis,
  DetailsMangaProps,
  ApiResponse,
  DetailsChapterContentProps,
};
