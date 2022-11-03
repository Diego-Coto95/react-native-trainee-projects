import 'react-native-gesture-handler';
import React from 'react';
import { Navigation } from './src/navigation/StackNavigation';
// import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/context/themeContext/ThemeContext';

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Navigation />
//     </NavigationContainer>
//   )
// }

const App = () => {
  return (
    <AppState>
        <Navigation />
    </AppState>
  )
}



const AppState = ({ children }: any) => {
  return (
    <ThemeProvider>
      { children }
    </ThemeProvider>
  )
}

export default App;
