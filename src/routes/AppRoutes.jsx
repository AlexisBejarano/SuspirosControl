import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login  from "../login";


export default function AppRoutes(){
    return(
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}/>
                </Routes>
        </BrowserRouter>
    );
}