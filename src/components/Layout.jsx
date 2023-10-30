import { AuthProvider } from "../context/AuthContext";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return(
        <AuthProvider>
            <NavBar/>
            <div className="App">
                <Outlet/>
            </div>
        </AuthProvider>
    )
}

export default Layout;
