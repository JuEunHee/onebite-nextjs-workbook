import { Movie } from "@/types/movie";

/**
 * @param {Array} movies - 전체 영화 배열
 * @returns {Array} 3개의 랜덤 영화 배열
 */
export const getRandomMovies = (movies: Movie[]): Promise<Movie[] | []> => {
  // 1. 원본 배열을 복사한 뒤 무작위로 섞음 (원형 표현: Array Shuffling)
  // 2. 앞에서부터 3개만 자름 (원형 표현: Array Slicing)
  return new Promise((resolve) => {
    const response = [...movies]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

        resolve(response);
  })
};