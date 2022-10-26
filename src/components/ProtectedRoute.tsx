import { Navigate } from "react-router-dom";
import { useUserAuth } from "../contexts/authContext";
interface Props {
    children: JSX.Element,
    destination: string,
}
const ProtectedRoute = ( { children, destination }: Props ) => {
    const { user } = useUserAuth();
    if ( user.email == undefined) {
        console.log("USER: " + user.displayName);
        return <Navigate to={destination}/>;
    } 
    else {
        console.log("Logged in user: " + user.email);
        return children;
    }
}

export default ProtectedRoute
