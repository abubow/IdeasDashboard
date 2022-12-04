import { createContext, useContext, useState } from "react";

export const NavbarContext = createContext({});
type Props = {
    children: JSX.Element,  
    };
export function NavbarProvider({ children }: Props) {
    const [navbar, setNavbar] = useState('Ideas');
    return (
        <NavbarContext.Provider value={{ navbar, setNavbar }}>
            {children}
        </NavbarContext.Provider>
    );
}

export function useNavbar() {
    return useContext(NavbarContext);
}