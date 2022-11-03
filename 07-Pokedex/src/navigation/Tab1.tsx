import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen1 } from '../screens/HomeScreen';
import { PokemonScreen } from '../screens/PokemonScreen';

import { SimplePokemon } from '../interfaces/pokemonInterfaces';


export type RootStackParams = {
  HomeScreen: undefined,
  PokemonScreen: { simplePokemon: SimplePokemon, color: string }
}


const Stack = createStackNavigator<RootStackParams>();

export const Tab1 = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name="HomeScreen" component={ HomeScreen1 } />
      <Stack.Screen name="PokemonScreen" component={ PokemonScreen } />
    </Stack.Navigator>
  );
}