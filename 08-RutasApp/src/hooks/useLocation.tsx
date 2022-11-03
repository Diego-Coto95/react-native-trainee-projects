import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';


export const useLocation = () => {
    
    const [ hasLocation, setHasLocation ] = useState(false);
    const [routeLines, setRouteLines] = useState<Location[]>([]); //Arreglo de todas las ubicaciones de donde la persona ha estado 
    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude: 0,
        longitude: 0
    });

    const [userLocation, setUserLocation] = useState<Location>({
        latitude: 0,
        longitude: 0
    });

    const watchId = useRef<number>();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, [])
    

    useEffect(() => {
        getCurrentLocation()
        .then( location => {
            if( !isMounted.current ) return;
            setInitialPosition(location);  ///Posicion inicial del mapa
            setUserLocation(location);     //Posicion en la que actualmente se encuentra el usuario
            setRouteLines( routes => [ ...routes, location ]); //Esta es la primera ruta
            setHasLocation(true);
        });
    }, [])

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise ( (resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({coords}) =>{
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
                },
                (err) => reject({err}),{ enableHighAccuracy: true }
            );
        });
    };

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({coords}) =>{
                // console.log({coords})
                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
                setUserLocation( location );
                setRouteLines( routes => [ ...routes, location ]);
            },
            (err) => console.log({err}),{ enableHighAccuracy: true, distanceFilter: 10 } // Cada que pasan 10 metros la app va a notificar
        )
    };

    const stopFollowUserLocation = () => {
        if ( watchId.current)
        Geolocation.clearWatch( watchId.current );
    };
    
    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        userLocation,
        followUserLocation,
        stopFollowUserLocation,
        routeLines
    }
};
