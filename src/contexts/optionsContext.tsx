import { createContext, useContext, useState } from "react";

export const OptionSelectedContext = createContext({});
type Props = {
    children: JSX.Element,  
    };
export function OptionsSelectedProvider({ children }: Props) {
    const [optionSelected, setOptionSelected] = useState('Projects');
    return (
        <OptionSelectedContext.Provider value={{ optionSelected, setOptionSelected }}>
            {children}
        </OptionSelectedContext.Provider>
    );
}

export default function useOptionSelected() {
    return useContext(OptionSelectedContext);
}