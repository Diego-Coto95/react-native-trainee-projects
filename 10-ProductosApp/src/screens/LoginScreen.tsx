import React, {useContext,useEffect} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {

    const {singIn, errorMessage, removeError} = useContext(AuthContext);

    const {email, password, onChange} = useForm({
        email: '',
        password: ''
    });
    
    useEffect(() => {
        if(errorMessage.length === 0)return;
        Alert.alert('Login incorrecto', errorMessage,
            [
                {
                    text: 'Ok',
                    onPress: removeError
                }
            ]
        );
    }, [ errorMessage ]);
    

    const onLogin = () => {
        console.log({email, password});
        Keyboard.dismiss(); //Oculta el teclado
        singIn({correo: email, password});
    }
    
    return (
        <>
            <Background />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height'} 
            >
                <View style={ loginStyles.formContainer }>
                    <WhiteLogo />

                    <Text style={ loginStyles.title }>Login</Text>
                    <Text style={ loginStyles.label }>Email:</Text>
                    <TextInput 
                        placeholder='Ingrese su email:'
                        placeholderTextColor={"rgba(255,255,255,0.4)"}
                        // keyboardType= "email-address"
                        underlineColorAndroid='white'
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios')
                            && loginStyles.inputFieldIOS
                        ]}
                        selectionColor= 'white'
                        onChangeText={ (value) => onChange(value, 'email')}
                        value= {email}
                        onSubmitEditing={ onLogin }
                        autoCapitalize='none'
                        autoCorrect={ false }
                    />
                    <Text style={ loginStyles.label }>Password:</Text>
                    <TextInput 
                        placeholder='********'
                        placeholderTextColor={"rgba(255,255,255,0.4)"}
                        underlineColorAndroid='white'
                        secureTextEntry //Para que no muestre el password
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios')
                            && loginStyles.inputFieldIOS
                        ]}
                        selectionColor= 'white'
                        onChangeText={ (value) => onChange(value, 'password')}
                        value= {password}
                        onSubmitEditing={ onLogin }
                        // autoCapitalize='none'
                        // autoCorrect={ false }
                    />
                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style= { loginStyles.button }
                            onPress= { onLogin }
                        >
                            <Text style= { loginStyles.buttonText }>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ loginStyles.newUserContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            onPress={ () => navigation.replace('RegisterScreen') } //El replace sirve para no devolverse a la pestaña anterior
                        >
                            <Text style= { loginStyles.buttonText }>Nueva Cuenta </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};
