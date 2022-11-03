import React, { createContext, useState } from 'react';

/*Para hacer un context se necesita
- Estado inicial
- Providder
- Context

*/


interface ImageColors{
    primary: string;
    secondary: string;
}

interface ContextProps {
    colors: ImageColors;
    prevColors: ImageColors;
    setMainColors: (colors: ImageColors) => void;
    setPrevMainColors: (colors: ImageColors) => void;
}

export const GradientContext = createContext({} as ContextProps); // TODO: definir tipo

export const GradientProvider = ({ children}: any) => {

    const [colors, setColors] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent',
    });

    const [prevColors, setPrevColors] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent',
    });

    const setMainColors = (colors1: ImageColors) => {
        setColors(colors1);
    };

    const setPrevMainColors = (colors2: ImageColors) => {
        setPrevColors(colors2);
    };

    return (
        <GradientContext.Provider
            value={{
                colors,
                prevColors,
                setMainColors,
                setPrevMainColors,
            }}
        >
            {children}
        </GradientContext.Provider>
    );
};
