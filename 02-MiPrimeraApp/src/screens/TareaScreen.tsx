import React from 'react';
import { View, StyleSheet } from 'react-native';
export const TareaScreen = () => {
    return (
    <View style = { styles.container }>
        <View style= { styles.purpleBox} />
        <View style= { styles.orangeBox} />
        <View style= { styles.blueBox} />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#28425B',
    },
    purpleBox: {
        backgroundColor: '#5856D6',
        width: 100,
        height: 100,
        borderWidth: 10,
        borderColor: 'gray',
    },
    orangeBox: {
        backgroundColor: '#F0A23B',
        width: 100,
        // height: 575,
        flex: 1,
        borderWidth: 10,
        borderColor: 'gray',
    },
    blueBox: {
        backgroundColor: 'navy',
        width: 100,
        height: 100,
        borderWidth: 10,
        borderColor: 'gray',
    },
});

