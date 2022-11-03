import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { AppState, Platform } from "react-native";
import { PermissionStatus, request, PERMISSIONS,check, openSettings } from 'react-native-permissions';



export interface PermissionsState {
    locationStatus: PermissionStatus;
}

export const permissionsInitState: PermissionsState = {
    locationStatus: 'unavailable',

}

type PermissionsContextProps = {
    permissions: PermissionsState; //Objeto con todos los permisos

    //Estas son dos funciones para pedir la localizacion
    askLocationPermission: () => {}; 
    checkLocationPermission: () => {};
}

export const PermissionsContext = createContext({} as PermissionsContextProps); //TODO que exorta

export const PermissionsProvider = ( { children }: any) => {
    
    const [permissions, setPermissions] = useState(permissionsInitState);


    // Este useEffect se hace para saber si la apliacion esta activa o no 
    useEffect(() => {
        checkLocationPermission();
        AppState.addEventListener('change', state => {
            // console.log({state}); 
            if( state !== 'active') return; //Si no esta activo que se salga

            checkLocationPermission();
        })
    }, [])
    
    
    const askLocationPermission = async() => {
        let permissionsStatus: PermissionStatus;

        if(Platform.OS === 'ios'){
            // permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            permissionsStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }
        else{
            // permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); //Da la precision de la localizacion
            permissionsStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); //Da la precision de la localizacion
        }

        if(permissions.locationStatus === 'blocked'){
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionsStatus
        })

    }
    const checkLocationPermission = async() => {
        let permissionsStatus: PermissionStatus;

        if(Platform.OS === 'ios'){
            permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }
        else{
            permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); //Da la precision de la localizacion
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionsStatus
        })
    }


    return (
        <PermissionsContext.Provider value={{permissions,askLocationPermission,checkLocationPermission, }}>
            {children}
        </PermissionsContext.Provider>
    )
}