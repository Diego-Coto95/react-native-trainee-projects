import ImageColors from "react-native-image-colors";


export const getImageColors = async (uri: string) => {
    // console.log(index);
    // console.log(nowPlaying[index].title);
    // const movie = nowPlaying[index];
    // const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    // console.log(uri);

    const colors = await ImageColors.getColors(uri, {});
    // console.log(colors); //obtiene el color de cada imagen

    let primary;
    let secondary;

    switch (colors.platform) {
        case 'android':
          // android result properties
            primary = colors.dominant;
            secondary = colors.average;
            break;
        case 'ios':
            // iOS result properties
            primary = colors.primary;
            secondary = colors.secondary;
            break;
        default:
            throw new Error('Unexpected platform key');
    }
    return [primary, secondary];
};
