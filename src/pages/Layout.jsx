import React from 'react';
import AppHeader from "../components/appHeader/AppHeader";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <AppHeader/>
            <main>
               <Outlet/>
            </main>
        </>
    );
};

export default Layout;