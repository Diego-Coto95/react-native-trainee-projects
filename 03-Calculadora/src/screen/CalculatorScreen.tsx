import React from 'react';
import { Text, View } from 'react-native';
import ButtonCalc from '../components/ButtonCalc';
import { styles } from '../theme/appTheme';
import useCalculator from '../hooks/useCalculator';

export const CalculatorScreen = () => {

    const {
        numberBefore,
        number,
        clean,
        plusMinus,
        deleteDigit,
        btnDivide,
        btnMultiply,
        btnRest,
        btnSum,
        createNumber,
        calculate,
    } = useCalculator();
    return (
        <View style ={ styles.calculatorContainer }>
            { (numberBefore !== '0') && (
                <Text style = { styles.littleResult }>{numberBefore}</Text>
            )}
            <Text style = { styles.result } numberOfLines={1} adjustsFontSizeToFit = {true} >{number}</Text>

            {/*Fila de botones*/}
            <View style = { styles.row }>
                <ButtonCalc text = "C" color = "#9B9B9B" action={clean}/>
                <ButtonCalc text = "+/-" color = "#9B9B9B" action={plusMinus}/>
                <ButtonCalc text = "del" color = "#9B9B9B" action={deleteDigit}/>
                <ButtonCalc text = "/" color = "#FF9427" action={btnDivide}/>
            </View>
            {/*Fila de botones*/}
            <View style = { styles.row }>
                <ButtonCalc text = "7" action={createNumber}/>
                <ButtonCalc text = "8" action={createNumber}/>
                <ButtonCalc text = "9" action={createNumber}/>
                <ButtonCalc text = "x" color = "#FF9427" action={btnMultiply}/>
            </View>
            {/*Fila de botones*/}
            <View style = { styles.row }>
                <ButtonCalc text = "4" action={createNumber}/>
                <ButtonCalc text = "5" action={createNumber}/>
                <ButtonCalc text = "6" action={createNumber}/>
                <ButtonCalc text = "-" color = "#FF9427" action={btnRest}/>
            </View>
            {/*Fila de botones*/}
            <View style = { styles.row }>
                <ButtonCalc text = "1" action={createNumber}/>
                <ButtonCalc text = "2" action={createNumber}/>
                <ButtonCalc text = "3" action={createNumber}/>
                <ButtonCalc text = "+" color = "#FF9427" action={btnSum}/>
            </View>
            {/*Fila de botones*/}
            <View style = { styles.row }>
                <ButtonCalc text = "0" action={createNumber} buttonWidth={true} />
                <ButtonCalc text = "." action={createNumber}/>
                <ButtonCalc text = "=" color = "#FF9427" action={calculate}/>
            </View>
        </View>
    );
};
