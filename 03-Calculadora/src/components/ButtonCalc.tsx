import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../theme/appTheme';

interface Props {
  text: string;
  color?: string;
  buttonWidth?: boolean; //si no llega el ancho el valor por defecto es false
  action: ( numberText: string) => void;
}

const ButtonCalc = ( { text, color = '#2D2D2D', buttonWidth = false, action}: Props ) => { //A esto se le llama destructuracion
    return (
      <TouchableOpacity onPress = { () => action(text) } activeOpacity={0.65}>
        <View style = {{ ...styles.button,
                          backgroundColor: color,
                          width: (buttonWidth) ? 180 : 80
                          }}>
          <Text style = {{ ...styles.buttonText, color: ( color === '#9B9B9B' ) ? 'black' : 'white' }}> {text} </Text>
        </View>
      </TouchableOpacity>
  );
};

export default ButtonCalc;
