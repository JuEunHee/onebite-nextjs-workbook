import { useRouter } from 'next/router';
import movies from '../../dummy.json';
import style from './[id].module.css';
import SEO from '../components/seo';

export default function Page() {
    const router = useRouter();

    const { id } = router.query;

    const findMovie = (id: any) => {
      return movies.find((movie) => movie.id === +id);
    }
    const movie = findMovie(id);

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
      posterImgUrl,
      title,
      subTitle,
      genres,
      runtime,
      company,
      releaseDate,
      description
    } = movie;

    return (
      <>
        <SEO title={title} description={subTitle} />
        <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${posterImgUrl}')`}}
        >
          <img src={posterImgUrl} />
        </div>

        <section className={style.info_container}>
          <h1>{title}</h1>
          <div>
            {releaseDate} | {genres.join(', ')} | {runtime}분
          </div>
          <p>{company}</p>

          <div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.description}>{description}</div>
          </div>
        </section>
      </div>
      </>
      
    )
}