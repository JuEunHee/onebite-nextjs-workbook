import type { InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import fetchMovies from '@/lib/apis/fetch-movies';
import SEO from './components/seo';
import MovieItem from './components/movie/movie-item';
import SearchableLayout from './components/layout/SearchableLayout';
import styles from './index.module.css';
import { getRandomMovies } from '@/lib/utils/movie';
import { Movie } from '@/types/movie';


/**
 * 
 * 1. 서버사이드 렌더링의 경우 매번 접속 요청시마다 새롭게 요청하기때문에,
 * 항상 최신 버전으로 가져올 수 있다는 장점이 있으나
 * 양이 많거나 무거운 연산인 경우 브라우저의 로딩을 기다리면서 불편함을 느낄 수 있다.
 * 
 * 2. 정적 사이트 생성 방식은
 * SSR의 단점을 해결하는 사전 렌더링 방식으로, 
 * 빌드 타임에 페이지를 미리 사전렌더링해둠.
 */


// 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
export const getStaticProps = async () => {
  console.log('인덱스 페이지')
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
    },
    revalidate: 3,
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
export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
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