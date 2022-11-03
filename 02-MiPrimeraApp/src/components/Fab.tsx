import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View, Platform, TouchableOpacity } from 'react-native';

interface Props {
    title: string;
    onPress: () => void;
    // position?: 'br' | 'bl';  el ? es por si es optional
    position: 'br' | 'bl';
}

const Fab = ( {title, onPress, position = 'br' }: Props) => {

    const ios = () => {
        return (
            <TouchableOpacity
                activeOpacity={0.75}
                style = {[
                    // (position === 'bl')
                    // ?styles.fabLocationBL
                    // :styles.fabLocationBR
                    styles.fabLocation,
                    (position ===  'bl') ? styles.left : styles.right,
                ]}
                onPress = {onPress}
            >
                <View style={ styles.fab }>
                    <Text style={ styles.fabText}> {title} </Text>
                </View>
            </TouchableOpacity>
        );
    };
    const android = () => {
        return (
            // <TouchableOpacity
            //     style = {[
            //         // (position === 'bl')
            //         // ?styles.fabLocationBL
            //         // :styles.fabLocationBR
            //         styles.fabLocation,
            //         (position ===  'bl') ? styles.left : styles.right,
            //     ]}
            //     onPress = {onPress}
            // >
            //     <View style={ styles.fab }>
            //         <Text style={ styles.fabText}> {title} </Text>
            //     </View>
            // </TouchableOpacity>
            <View style = {[
                styles.fabLocation,
                (position ===  'bl') ? styles.left : styles.right,
                ]}
            >
                <TouchableNativeFeedback onPress = {onPress} background = {TouchableNativeFeedback.Ripple('black',false, 30)}>
                    <View style={ styles.fab }>
                        <Text style={ styles.fabText}> {title} </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    };

    return (Platform.OS === 'ios') ? ios() : android();
};

const styles = StyleSheet.create({
    fabLocation: {
        position: 'absolute',
        bottom: 20,
    },
    right: {
        right: 25,
    },
    left: {
        left: 25,
    },
    fab: {
        backgroundColor: '#5856D6',
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    fabText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
});

// const styles = StyleSheet.create({
//     fabLocationBL: {
//         position: 'absolute',
//         bottom: 20,
//         left: 20
//     },
//     fabLocationBR: {
//         position: 'absolute',
//         bottom: 20,
//         right: 20
//     },
//     fab: {
//         backgroundColor: '#5856D6',
//         width: 60,
//         height: 60,
//         borderRadius: 100,
//         justifyContent: 'center'
//     },
//     fabText: {
//         color: 'white',
//         fontSize: 25,
//         fontWeight: 'bold',
//         alignSelf: 'center'
//     }
// })

export default Fab;
