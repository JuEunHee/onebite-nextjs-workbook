import { IMDB_API_URL } from "../consts";
import { Movie } from "@/types/movie";

export default async function fetchMovieDetail(movieId: number): Promise<Movie | null> {
    if (!movieId) {
        return null;
    }

    const baseUrl = `${IMDB_API_URL}movie/${movieId}`;
    const params = new URLSearchParams({
        api_key: process.env.IMDB_API_KEY || '',
        language: 'ko-KR'
    });
    
    try {

        const response = await fetch(`${baseUrl}?${params.toString()}`);

        if (!response.ok) {
            throw new Error('검색에 실패하였습니다');
        }

        return await response.json();
    } catch (error) {
        console.error(error);

        return null;
    }
}