import { TMDBResponse } from "@/types/movie";
import { IMDB_API_URL } from "../consts";

export default async function fetchMovies(): Promise<TMDBResponse | []> {
    const baseUrl = `${IMDB_API_URL}discover/movie`;
    const params = new URLSearchParams({
        api_key: process.env.IMDB_API_KEY || '',
        language: 'ko-KR'
    });

    try {
        const response = await fetch(`${baseUrl}?${params.toString()}`);

        if (!response.ok) {
            throw new Error();
        }

        return await response.json();
    } catch (error) {
        console.error(error);

        return [];
    }
}

