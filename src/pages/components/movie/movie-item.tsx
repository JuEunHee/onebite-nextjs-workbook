
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { TMDB_IMAGE_BASE_URL } from '@/lib/consts';
import style from './movie-item.module.css';

export default function MovieItem(props: Movie) {
    const {
        id,
        poster_path
    } = props;

    if (!poster_path) {
        return null;
    }

    return (
        <Link className={style.container} href={`/movie/${id}`}>
          <img src={`${TMDB_IMAGE_BASE_URL}/w500/${poster_path}`} />
        </Link>
    )
}
