import { useRouter } from 'next/router';
import Image from 'next/image';
import { ReactNode, useMemo } from 'react';
import style from './index.module.css';
import SearchableLayout from '../components/layout/SearchableLayout';
import movies from '../../dummy.json';
import MovieItem from '../components/movie/movie-item';
import SEO from '../components/seo';

export default function SearchPage() {
    const router = useRouter();
    const searchKeyword =
      typeof router.query.q === 'string' ? router.query.q : '';

    const searchMovie = (query: string) => {
      // 검색어와 제목 모두 소문자로 변환하여 비교 (영어 검색 시 유용)
      const lowerQuery = query.toLowerCase().trim();
      if (!lowerQuery) return [];
      
      return movies.filter(movie => 
        movie.title.toLowerCase().includes(lowerQuery)
      );
    };

    const searchedMovies = useMemo(() => {
      return searchMovie(searchKeyword);
    }, [movies, searchKeyword])

    const hasResult = searchedMovies.length > 0;
    
    if (!hasResult) {
      return (<p>해당하는 검색 결과를 찾을 수 없습니다.</p>)
    }

    return (
      <>
        <SEO title={`${searchKeyword} 검색 결과`} />
        <div className={style.container}>
          {searchedMovies.map((movie) => (
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
