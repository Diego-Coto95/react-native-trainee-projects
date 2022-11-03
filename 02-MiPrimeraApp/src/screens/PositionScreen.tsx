import React from 'react';
import { View, StyleSheet } from 'react-native';
export const PositionScreen = () => {
    return (
    <View style = { styles.container}>
        <View style = { styles.purpleBox} />
        <View style = { styles.orangeBox } />
        <View style = { styles.greenBox } />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //width: 400,
        //height: 400,
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#28C4D9',
    },
    purpleBox: {
        width: 100,
        height: 100,
        backgroundColor: '#5856D6',
        borderWidth: 10,
        borderColor: 'white',
        position: 'absolute',
        // bottom: 0,
        top: 0,
        right: 0,
    },
    orangeBox: {
        width: 100,
        height: 100,
        backgroundColor: '#F0A23B',
        borderWidth: 10,
        borderColor: 'white',
        position: 'absolute',
        // bottom: 0,
        // right: 0,
    },
    greenBox: {
        // width: 100,
        // height: 100,
        backgroundColor: 'green',
        borderWidth: 10,
        borderColor: 'white',
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // top: 0,
        // right: 0,
        ...StyleSheet.absoluteFillObject, //Se tiene el mismo efecto que poner todos los anteriores de position
    },
});

