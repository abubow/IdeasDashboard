import { createContext, useContext, useState } from "react";

interface ThemeContextProps {
    colorTheme: string,
    setColorTheme: React.Dispatch<React.SetStateAction<string>>,
}
export const ColorContext = createContext<ThemeContextProps>({} as ThemeContextProps);
interface Props {
    children: JSX.Element,  
    };
export function ThemeProvider({ children }: Props) {
    const [colorTheme, setColorTheme] = useState<string>('light');
    return (
        <ColorContext.Provider value={{ colorTheme, setColorTheme }}>
            {children}
        </ColorContext.Provider>
    );
}
export function useTheme() {
    return useContext(ColorContext);
}