import React, {useContext} from 'react';
import { ActivityIndicator, View, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import ImageColors from 'react-native-image-colors';
import Carousel from 'react-native-snap-carousel';
import { GradientBackground } from '../components/GradientBackground';
import { HorizontalSlider } from '../components/HorizontalSlider';

import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { getImageColors } from '../helpers/getColors';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';


// const windowWidth = Dimensions.get('window').width;
const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {

    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const {top} = useSafeAreaInsets();
    const {setMainColors} = useContext(GradientContext);

    const getPosterColors = async (index: number) => {
        // console.log(index);
        //console.log(nowPlaying[index].title);
        const movie = nowPlaying[index];
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        //console.log(uri);

        //const colors = await ImageColors.getColors(uri, {});
        // console.log(colors); //obtiene el color de cada imagen
        const [primary = 'green', secondary = 'orange'] = await getImageColors( uri );
        setMainColors({primary, secondary});
        // console.log(primary, secondary);
    };

    useEffect(() => {
        if (nowPlaying.length > 0){
            getPosterColors(0);
        }
    }, [nowPlaying]);

    if ( isLoading ) {
        return (
            <View style={ {flex:1,justifyContent:'center',alignItems:'center'} }>
                <ActivityIndicator color="red" size={100} />
            </View>
        );
    }

    return (
        <GradientBackground>
            <ScrollView>
                <View style={ { marginTop: top + 20 } }>
                    {/* <MoviePoster movie={moviesEnCine[0]}/> */}
                    <View style={{height:440}}>
                        {/* Carousel Principal */}
                        <Carousel
                            data={nowPlaying}
                            // renderItem={() => <MoviePoster movie={moviesEnCine[0]} />}
                            renderItem={({ item }: any) => <MoviePoster movie={item} />}
                            sliderWidth={ windowWidth }
                            itemWidth={ 300 }
                            inactiveSlideOpacity={0.9}
                            onSnapToItem={ index => getPosterColors( index )} //Me da la posicion del item
                        />
                    </View>
                    {/* Peliculas populares */}
                    {/* <View style={{height:260, backgroundColor:'red'}}>
                        <Text style= {{fontSize:30, fontWeight:'bold'}}>En cine</Text>
                        <FlatList
                            data={moviesEnCine}
                            renderItem={({ item }: any) =>
                                <MoviePoster movie={item} width = {140} height = {200}
                            />}

                            keyExtractor={ (item) => item.id.toString()}
                            horizontal = {true}
                            showsHorizontalScrollIndicator= {false}
                        />
                    </View> */}
                    {/* Películas populares */}
                    <HorizontalSlider title="Popular" movies={ popular } />
                    <HorizontalSlider title="Top Rated" movies={ topRated } />
                    <HorizontalSlider title="Upcoming" movies={ upcoming } />
                </View>
            </ScrollView>
        </GradientBackground>
    );
};
