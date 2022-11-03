import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import { Movie, MovieDBMoviesResponse } from '../interfaces/movieInterface';

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [moviesEnCine, setMoviesEnCine] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
    });
    //Los objetos se pasan como [] para asegurarnos que simpre tengan un valor

    // const getMovies = async () => {
    //     const resp = await movieDB.get<MovieDBNowPlaying>('/now_playing');
    //     setMoviesEnCine(resp.data.results);
    //     setIsLoading(false);
    // };

    const getMovies = async () => {

        const nowPlayingPromise = movieDB.get<MovieDBMoviesResponse>('/now_playing');
        const popularPromise    = movieDB.get<MovieDBMoviesResponse>('/popular');
        const topRatedPromise   = movieDB.get<MovieDBMoviesResponse>('/top_rated');
        const upcomingPromise   = movieDB.get<MovieDBMoviesResponse>('/upcoming');

        const response = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise,
        ]);

        setMoviesEnCine({
            nowPlaying: response[0].data.results,
            popular: response[1].data.results,
            topRated: response[2].data.results,
            upcoming: response[3].data.results,
        });

        setIsLoading( false );
    };

    useEffect(() => {
        //now_playing
        getMovies();
    }, []);

    return ({
        ...moviesEnCine,
        isLoading,
    }
    );
};
