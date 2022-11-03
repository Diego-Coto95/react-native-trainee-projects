import React, { createContext, useReducer, useEffect } from 'react';
import cafeApi from '../api/cafeApi';
import { LoginResponse, Usuario, LoginData, RegisterData } from '../interfaces/appInterface';
import { authReducer, AuthState } from './AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated'; //Estado de la autenticacion
    singIn: (LoginData:LoginData) => void;
    // singIn: () => void;
    singUp: (RegisterData:RegisterData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    token:  null,
    user: null,
    errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState );

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async() =>{
        const token = await AsyncStorage.getItem('token');
            // .then(token => {
            //     console.log({ token });
                
            // })
            // .catch( err => {
            //     console.log( { err } );
            // })
        if (!token) //si el token no existe 
            //no token, entonces no autenticado
            return dispatch( { type: 'notAuthenticated'})

        //si hay token 
        const { data, status } = await cafeApi.get('/auth');
        
        if( status !== 200){
            return dispatch({ type: 'notAuthenticated'});
        }
        await AsyncStorage.setItem('token', data.token); //ESto es opcional, comprueba que hay un nuevo token
        dispatch(
            {
                type: 'signUp', 
                payload: 
                {
                    token: data.token,
                    user: data.usuario
                }
            }
        );

    }
    

    const singIn = async({correo, password}: LoginData) => {
        try{
            const { data } = await cafeApi.post<LoginResponse>('/auth/login', {correo, password});
            dispatch(
                {
                    type: 'signUp', 
                    payload: 
                    {
                        token: data.token,
                        user: data.usuario
                    }
                }
            );
            // console.log(resp.data);
            await AsyncStorage.setItem('token', data.token);

        }catch (error){
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    };


    const singUp = async({nombre, correo, password}: RegisterData) => {
        try{
            const { data } = await cafeApi.post<LoginResponse>('/usuarios', {nombre, correo, password});
            dispatch(
                {
                    type: 'signUp', 
                    payload: 
                    {
                        token: data.token,
                        user: data.usuario
                    }
                }
            );
            // console.log(resp.data);
            await AsyncStorage.setItem('token', data.token); //Se establece el token en el AsyncStorage

        }catch (error){
            console.log(error.response.data);
            
            dispatch({
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'Revise la información'
            })
        }
    };


    const logOut = async() => {
        //Elimina el token y limpia la app
        await AsyncStorage.removeItem('token');
        dispatch({
            type: 'logOut'
        })
    };

    const removeError= () => {
        dispatch({
            type: 'removeError'
        })
    };

    return(
        <AuthContext.Provider 
            value={{
                ...state,
                singIn,
                singUp,
                logOut,
                removeError,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}