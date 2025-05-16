import { fetchAnimeData } from '@/lib/FetchAnime';

export default async function AnimeList() {
    const animeData = await fetchAnimeData();

    return (
        <div>
            {animeData && (
                <div>
                    {/* Di sini Anda bisa menampilkan data anime sesuai kebutuhan */}
                    {JSON.stringify(animeData)}
                </div>
            )}
        </div>
    );
} 