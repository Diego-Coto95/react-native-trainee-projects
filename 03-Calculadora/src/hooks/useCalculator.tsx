import { useRef, useState } from 'react';


enum Operators {
    sum, rest, multiply, divide
}

const useCalculator = () => {
    const [numberBefore, setNumberBefore] = useState('0');
    const [number, setNumber] = useState('0');

    const lastOperation = useRef<Operators>();

    const clean = () => {
        setNumber('0');
        setNumberBefore('0');
    };

    const createNumber = (numberText: string) => {
        //No aceptar doble punto
        if (number.includes('.') && numberText === '.') return;
        if (number.startsWith('0') || number.startsWith('-0')) {
            //Primer punto decimal
            if (numberText === '.'){
                setNumber(number + numberText);
            }
            //Evaluar si es otro cero , y hay un espacio
            else if (numberText === '0' && number.includes('.')){
                setNumber(number + numberText);
            }
            //Evaluar si es diferente de 0 y no tiene un punto
            else if (numberText !== '0' && !number.includes('.')){
                setNumber(numberText);
            }
            // Evitar 000.0
            else if (numberText === '0' && !number.includes('.')){
                setNumber(number);
            }
            else {
                setNumber(number + numberText);
            }
        }
        else {
            setNumber(number + numberText);
        }
    };

    const plusMinus = () => {
        if (number.includes('-')) {
            setNumber(number.replace('-',''));
        }
        else {
            setNumber('-' + number);
        }
    };

    const deleteDigit = () => {

        let negative = '';
        let tempNumber = number;
        if ( number.includes('-')){
            negative = '-';
            tempNumber = number.substring(1);
        }
        if (tempNumber.length > 1){
            setNumber( negative + tempNumber.slice(0, -1));
        }
        else {
            setNumber('0');
        }
    };

    const changeBeforeNumber = () => {
        if (number.endsWith('.')) {
            setNumberBefore(number.slice(0, -1));
        }
        else {
            setNumberBefore(number);
        }
        setNumber('0');
    };

    const btnDivide = () => {
        changeBeforeNumber();
        lastOperation.current = Operators.divide;
    };

    const btnMultiply = () => {
        changeBeforeNumber();
        lastOperation.current = Operators.multiply;
    };

    const btnSum = () => {
        changeBeforeNumber();
        lastOperation.current = Operators.sum;
    };

    const btnRest = () => {
        changeBeforeNumber();
        lastOperation.current = Operators.rest;
    };

    const calculate = () => {
        const num1 = Number(number);
        const num2 = Number(numberBefore);

        switch (lastOperation.current) {
            case Operators.sum:
                setNumber( `${num1 + num2}`);
                break;
            case Operators.multiply:
                setNumber( `${num1 * num2}`);
                break;
            case Operators.rest:
                setNumber( `${num2 - num1}`);
                break;
            case Operators.divide:
                setNumber( `${num2 / num1}`);
                break;
            default:
                break;
        }
        setNumberBefore('0');
    };

    return {
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
    };

};

export default useCalculator;
