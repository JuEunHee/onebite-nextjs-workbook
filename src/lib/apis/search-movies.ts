import { DEFAULT_MOVIE_SEARCH_RESPONSE, IMDB_API_URL } from "../consts";
import { TMDBResponse } from "@/types/movie";

export default async function searchMovies(keyword: string): Promise<TMDBResponse> {
    if (!keyword) {
        return DEFAULT_MOVIE_SEARCH_RESPONSE;
    }

    const baseUrl = `${IMDB_API_URL}search/movie`;
    const params = new URLSearchParams({
        api_key: process.env.IMDB_API_KEY || '',
        query: keyword,
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

        return DEFAULT_MOVIE_SEARCH_RESPONSE;
    }
}