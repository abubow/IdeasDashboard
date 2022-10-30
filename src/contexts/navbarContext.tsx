import { createContext, useState } from "react";

export const NavbarContext = createContext({});
type Props = {
    children: JSX.Element,  
    };
export function NavbarProvider({ children }: Props) {
    const [navbar, setNavbar] = useState('Projects');
    return (
        <NavbarContext.Provider value={{ navbar, setNavbar }}>
            {children}
        </NavbarContext.Provider>
    );
}