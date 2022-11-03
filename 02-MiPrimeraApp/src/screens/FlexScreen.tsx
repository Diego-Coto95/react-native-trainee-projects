import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
export const FlexScreen = () => {
    return (
    <View style = {styles.container}>
        <Text style = {styles.box1}>Caja 1</Text>
        <Text style = {styles.box2}>Caja 2</Text>
        <Text style = {styles.box3}>Caja 3</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#28C4D9',
        //flexDirection: 'column', //Esta viene por defecto en react native
        // flexDirection: 'row-reverse',
        // flexDirection: 'column-reverse',
        //justifyContent: 'flex-end',
        //justifyContent: 'center', //esta en el medio del componente padre
        //justifyContent: 'space-around',
        //justifyContent: 'space-between',
        //justifyContent: 'space-evenly',
        //flexDirection:'row',
        // justifyContent: 'flex-end',
        //alignItems: 'stretch',//opcion por defecto
        // alignItems: 'baseline',
        // alignItems: 'flex-end',
        // alignItems: 'flex-end',
        // alignItems: 'flex-start',
    },
    box1: {
        borderWidth: 2,
        borderColor: 'white',
        fontSize: 30,
        // alignSelf: 'flex-start',
        //alignSelf: 'center',
    },
    box2: {
        borderWidth: 2,
        borderColor: 'white',
        fontSize: 30,
        //alignSelf: 'flex-start',
    },
    box3: {
        borderWidth: 2,
        borderColor: 'white',
        fontSize: 30,
        // alignSelf: 'flex-end',
    },
});

