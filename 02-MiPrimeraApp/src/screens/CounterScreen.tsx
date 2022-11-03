import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Fab from '../components/Fab';

const CounterScreen = () => {

    const [counter, setCounter] = useState(10);
    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>
                Contador: {counter}
            </Text>
            <Fab
                title = "-1"
                position = "bl"
                onPress = { () => setCounter(counter - 1) }
            />
            <Fab
                title = "+1"
                position = "br"
                onPress = { () => setCounter(counter + 1)}
            />

            {/* <TouchableOpacity
                style= { styles.fabLocationBL }
                onPress={() => setCounter(counter - 1)}
            >
                <View style={ styles.fab }>
                    <Text style={ styles.fabText}>-1</Text>
                </View>
            </TouchableOpacity> */}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'aliceblue',
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        top: 55,
    },
});

export default CounterScreen;
