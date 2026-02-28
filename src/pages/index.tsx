import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import SearchableLayout from './components/layout/SearchableLayout';
import movies from '../dummy.json';
import styles from './index.module.css';
import MovieItem from './components/movie/movie-item';
import SEO from './components/seo';

export default function Home() {
  const router = useRouter();

  const recommendedMovies = movies.slice(-3);

  const handleMoveDetailPage = (id: number) => {
    router.push(`/movie/${id}`)
  }

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
            {movies.map((movie) => (
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