import { Outlet } from "react-router-dom";
import Home from "./Components/Home";
import Footer from "./Components/Footer";


export default function Layout () {
    return(
        <>
            <Home />
            <Outlet /> 
            <Footer />
        </>
    )
}