import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useUserAuth from "../contexts/authContext";
interface Props {
    children: JSX.Element,
    destination: string,
}
const ProtectedAuthRoute = ( { children, destination }: Props ) => {
    const { user, userDetails }:any = useUserAuth();
    // if ( user.email == undefined) {
    //     console.log("USER: " + user.displayName);
    //     return <Navigate to={destination}/>;
    // } 
    // else {
    //     console.log("Logged in user: " + user.email);
    //     return children;
    // }
    useEffect(()=>{
        console.log("User details: " + userDetails);
    })
    if (userDetails == undefined) {
        return <Navigate to={destination}/>;
    }
    return (
        <>
         {
            !!user && userDetails.Admin?
            children:
            <Navigate to={destination}/>
         }
        </> 
    )
}

export default ProtectedAuthRoute