import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import './App.scss';
import React from "react";
import {LoginPage} from "./pages/LoginPage";
import {ToDoListPage} from "./pages/ToDoListPage";

const usernameFromLocalStorage = localStorage.getItem('username')
const isUserLoggedIn = usernameFromLocalStorage != null

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                {
                    isUserLoggedIn ? null :
                        <Route path='/login' element={<LoginPage/>} />
                }
                {
                    isUserLoggedIn ?
                        <Route path='/to-do-list' element={<ToDoListPage/>} /> : null
                }
                {
                    isUserLoggedIn ?
                        <Route path='*' element={<Navigate to='/to-do-list' replace/>}/> :
                        <Route path='*' element={<Navigate to='/login' replace/>}/>
                }
            </Routes>
        </BrowserRouter>
    );
}
