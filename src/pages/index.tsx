import type { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import fetchMovies from '@/lib/apis/fetch-movies';
import SEO from './components/seo';
import MovieItem from './components/movie/movie-item';
import SearchableLayout from './components/layout/SearchableLayout';
import styles from './index.module.css';
import { getRandomMovies } from '@/lib/utils/movie';
import { Movie } from '@/types/movie';

// 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
export const getServerSideProps = async () => {
  const data = await fetchMovies();
  const allMovies = "results" in data ? data.results : data;
  const recommendedMovies = await getRandomMovies(allMovies);

  /**
   * console.log('서버사이드 프롭스에요');


   * 자바스크립트의 window는 브라우저를 의미하므로 
   * 서버에서 실행됐을때 브라우저를 읽을 수 없으니 window.location은 오류가 발생하게 된다.
   * 
   * window.location // 'window' is not defined
   */

  return {
    props: {
      recommendedMovies,
      allMovies
    }
  }
};


/**
 * 
 * 📋 InferGetServerSidePropsType 구조적 분석표
 * 
  | 단계 | TypeScript 연산자 | 역할 (Description)                                                 | 데이터 변화 예시 (Conceptual) |
  | :--- | :--- | :--- | :---                                                                   |
  | **Step 0** | **Input (T)** | getServerSideProps 함수 자체를 입력받음                           | `async () => { return { props: { id: 1 } } }` |
  | **Step 1** | **ReturnType<T>** | 함수의 리턴 타입이 무엇인지 확인                                | `Promise<{ props: { id: 1 } } | { redirect: ... }>` |
  | **Step 2** | **Awaited<...>** | Promise 포장지를 벗겨 내부 데이터 추출                           | `{ props: { id: 1 } } | { redirect: ... }` |
  | **Step 3** | **Extract<..., { props: any }>** | 여러 리턴 형태 중 'props' 키가 있는 객체만 필터링 | `{ props: { id: 1 } }` |
  | **Step 4** | **['props']** | 객체 내부의 'props' 키에 해당하는 타입만 지목                        | `{ id: 1 }` |
  | **Step 5** | **Final Type** | **컴포넌트가 실제로 전달받을 Props 타입 완성**                      | **`{ id: number }`** |
 */
export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  /**
   * Home또한 먼저 실행된 후 브라우저에서 한 번 더 실행됨.
   * 사전 렌더링으로 먼저 실행되고, 자바스크립트 번들로 전달 후 hydration될때 한 번 더 실행되므로 
   * 총 두 번 실행되게 된다.
   * 
   * 그러므로 아래 코드는 사전 렌더링 시 서버에서 실행되므로 여기서 에러가 발생하게 됨.
   * console.log(window.location) // window is not defined
   * 
   * 만약 window를 쓰고싶다면 useEffect를 쓰면되는데,
   * 조건 자체가 마운트 된 이후에만 실행되도록 되어있기 때문이다.
   */
  const { recommendedMovies, allMovies } = props;

  return (
    <>
      <SEO title="HOME" />
      <div className={styles.container}>
        {/* 지금 가장 추천하는 영화 */}
        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>
            지금 가장 추천하는 영화
          </h1>

          <div className={styles.recommendedMoviesContainer}>
            {recommendedMovies.map((movie) => (
              <MovieItem key={`recommended-movie-${movie.id}`} {...movie} />
            ))}
          </div>
          
        </section>
        
        {/* 등록된 모든 영화 */}
        <section>
          <h1 className={styles.sectionTitle}>
            등록된 모든 영화
          </h1>

          <div className={styles.allMoviesContainer}>
            {allMovies.map((movie) => (
              <MovieItem key={`recommended-movie-${movie.id}`} {...movie} />
            ))}
          </div>
          
        </section>
      </div>
    </>
    
  );
}

Home.getLayout = (page: ReactNode ) => {
  return (
    <SearchableLayout>
      {page}
    </SearchableLayout>
  )
}