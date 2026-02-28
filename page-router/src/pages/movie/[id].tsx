import { GetServerSidePropsContext } from 'next';
import style from './[id].module.css';
import SEO from '../components/seo';
import fetchMovieDetail from '@/lib/apis/fetch-movie-detail';
import { Movie } from '@/types/movie';
import { TMDB_IMAGE_BASE_URL } from '@/lib/consts';

const getNames = (items: (string | { name: string })[]) => {
  return items.map((item) => {
    if (typeof item === 'string') return item; // 문자열이면 그대로 반환
    return item.name; // 객체면 name 추출
  }).join(', ');
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  if (!context.query.id) {
    return { props: {} }
  }

  const movieId = +context.query.id as number;
  const movie = await fetchMovieDetail(movieId);

  return {
    props: {
      movie,
    }
  }
}


export default function Page({ movie }: {
  movie: Movie
}) {
    if (!movie) {
      return (
        <div className={style.container}>
          잘못된 접근입니다.
          <br />
          해당하는 영화가 없습니다.
        </div>
      )
    }

    const {
      title,
      genres,
      tagline,
      poster_path,
      release_date,
      runtime,
      production_companies,
      overview,
    } = movie;

    const imageUrl = `${TMDB_IMAGE_BASE_URL}/w500/${poster_path}`;
    const genreNames = getNames(genres);
    const productionCompanies = getNames(production_companies);

    return (
      <>
        <SEO title={title} description={`${genreNames ?? ''}`} />
        <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${imageUrl}')`}}
        >
          <img src={imageUrl} />
        </div>

        <section className={style.info_container}>
          <h1>{title}</h1>
          <div>
            {release_date} | {genreNames} | {runtime}분
          </div>
          <p>{productionCompanies}</p>

          <div>
            <div className={style.subTitle}>{tagline}</div>
            <div className={style.description}>{overview}</div>
          </div>
        </section>
      </div>
      </>
      
    )
}