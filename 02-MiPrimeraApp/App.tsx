import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
// import { FlexScreen } from './src/screens/FlexScreen';
// import { TareaScreen } from './src/screens/TareaScreen';
// import { PositionScreen } from './src/screens/PositionScreen';
// import { DimensionsScreen } from './src/screens/DimensionsScreen';
import { BoxObjectModelScreen } from './src/screens/BoxObjectModelScreen';
// import CounterScreen from './src/screens/CounterScreen';
// import HolaMundoScreen from './src/screens/HolaMundoScreen';

const App = () => {
  return (
    <SafeAreaView style ={ styles.container }>
      {/* <HolaMundoScreen /> */}
      {/* <CounterScreen /> */}
      <BoxObjectModelScreen />
      {/* <DimensionsScreen /> */}
      {/* <PositionScreen /> */}
      {/* <FlexScreen /> */}
      {/* <TareaScreen /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#28425B',//Esto para usarlo en ios
    },
});

export default App;
