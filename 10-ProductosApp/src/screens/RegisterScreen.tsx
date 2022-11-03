import { StackScreenProps } from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { WhiteLogo } from '../components/WhiteLogo';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({ navigation }: Props) => {

    const { singUp, errorMessage, removeError } = useContext( AuthContext );

    const {name, email, password, onChange} = useForm({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if(errorMessage.length === 0)return;
        Alert.alert('Registro incorrecto', errorMessage,
            [
                {
                    text: 'Ok',
                    onPress: removeError
                }
            ]
        );
    }, [ errorMessage ]);
    
    const onRegister = () => {
        console.log({name, email, password});
        Keyboard.dismiss(); //Oculta el teclado
        singUp({nombre:name ,correo: email, password});
    }
    

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#5856D6' }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height'} 
            >
                <View style={ loginStyles.formContainer }>
                    <WhiteLogo />

                    <Text style={ loginStyles.title }>Sign Up</Text>
                    <Text style={ loginStyles.label }>Name:</Text>
                    <TextInput 
                        placeholder='Ingrese su nombre:'
                        placeholderTextColor={"rgba(255,255,255,0.4)"}
                        underlineColorAndroid='white'
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios')
                            && loginStyles.inputFieldIOS
                        ]}
                        selectionColor= 'white'
                        onChangeText={ (value) => onChange(value, 'name')}
                        value= {name}
                        onSubmitEditing={ onRegister }
                        autoCapitalize='words'
                        autoCorrect={ false }
                    />
                    <Text style={ loginStyles.label }>Email:</Text>
                    <TextInput 
                        placeholder='Ingrese su email:'
                        placeholderTextColor={"rgba(255,255,255,0.4)"}
                        keyboardType= "email-address"
                        underlineColorAndroid='white'
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios')
                            && loginStyles.inputFieldIOS
                        ]}
                        selectionColor= 'white'
                        onChangeText={ (value) => onChange(value, 'email')}
                        value= {email}
                        onSubmitEditing={ onRegister }
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
                        onSubmitEditing={ onRegister }
                        // autoCapitalize='none'
                        // autoCorrect={ false }
                    />
                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style= { loginStyles.button }
                            onPress= { onRegister }
                        >
                            <Text style= { loginStyles.buttonText }>Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                        onPress={ () => navigation.replace('LoginScreen') } //El replace sirve para no devolverse a la pestaña anterior
                        style={ loginStyles.buttonReturn }
                    >
                        <Text style= { loginStyles.buttonText }>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};
