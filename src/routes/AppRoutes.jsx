import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "../login";
import App from "../App";


export default function AppRoutes(){
    return(
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/app" element={<App />}/>
                </Routes>
        </BrowserRouter>
    );
}