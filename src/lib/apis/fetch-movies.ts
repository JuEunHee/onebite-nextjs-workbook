import { TMDBResponse } from "@/types/movie";

export default async function fetchMovies(): Promise<TMDBResponse | []> {
    const url = `https://api.themoviedb.org/3/discover/movie`;
    const params = `?api_key=${process.env.IMDB_API_KEY}&langage=ko-KR`;

    try {
        const response = await fetch(url + params);

        if (!response.ok) {
            throw new Error();
        }

        return await response.json();
    } catch (error) {
        console.error(error);

        return [];
    }
}

