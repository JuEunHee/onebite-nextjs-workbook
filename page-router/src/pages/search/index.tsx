import { useRouter } from 'next/router';
import Image from 'next/image';
import { ReactNode, useMemo } from 'react';
import style from './index.module.css';
import SearchableLayout from '../components/layout/SearchableLayout';
import MovieItem from '../components/movie/movie-item';
import SEO from '../components/seo';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import searchMovies from '@/lib/apis/search-movies';

/**
 * [GetServerSidePropsContext]
 * 
 * Context라는 매개변수에는 현재 브라우저로부터 전달받은 모든 브라우저 정보가 들어있다.
 */
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const keyword = context.query.q as string ?? '';
  const data = await searchMovies(keyword);
  const movies = "results" in data ? data.results : [];

  return {
    props: {
      movies,
    }
  }
}

export default function SearchPage({ movies }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const searchKeyword =
      typeof router.query.q === 'string' ? router.query.q : '';
    const isNotFound = movies.length <= 0;

    if (isNotFound) {
      return (<p>해당하는 검색 결과를 찾을 수 없습니다.</p>)
    }

    return (
      <>
        <SEO title={`${searchKeyword} 검색 결과`} />

        <div className={style.container}>
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </>
    )
}

SearchPage.getLayout = (page: ReactNode) => {
  return (
    <SearchableLayout>
      {page}
    </SearchableLayout>
  )
}
