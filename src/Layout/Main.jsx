import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";

const Main = () => {
    return (
        <div className="bg-slate-100">
            <Navbar></Navbar>
            <div className="py-10"></div>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;