// authentication context made using firebase and context api
import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase-config";
const userAuthContext = createContext({});

type Props = {
    children: JSX.Element,
  };
export function UserAuthProvider({ children }: Props) {
    const [user, setUser] = useState({});
    function logIn(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function logOut() {
        return signOut(auth);
    }
    function signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function updateName(name: string) {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, { displayName: name });
        }
    }
    onAuthStateChanged(auth, (userC) => {
                    console.log("AuthUSER: " + userC);
                    if (userC) {
                        setUser(userC);
                    } else {
                        setUser({});
                    }
                })
    return (
        <userAuthContext.Provider value={{ signUp, logIn, logOut, updateName, user }}>
            {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
