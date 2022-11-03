import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL= 'http://192.168.20.148:8080/api';

const cafeApi = axios.create({ baseURL });

//Esto es debido a que la aplicacion requiere el token para hacer
//varias cosas por eso se hace este middleware de axios
cafeApi.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if ( token ){
            config.headers['x-token'] = token;
        }
        return config;
    }
);

export default cafeApi;