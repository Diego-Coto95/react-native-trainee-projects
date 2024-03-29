import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { Navigation } from './src/navigation/StackNavigator';
import { GradientProvider } from './src/context/GradientContext';
// import { FadeScreen } from './src/screens/FadeScreen';

const AppState = ({children}: any) => {
  return (
    <GradientProvider>
      {children}
    </GradientProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
      </AppState>
      {/* <FadeScreen /> */}
    </NavigationContainer>
  );
};

export default App;
