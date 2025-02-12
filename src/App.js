import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoutes from './components/ProtectedRoutes';
import AddExpense from './pages/AddExpense/AddExpense';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';
import Settings from './pages/Settings/Settings';



const App = () => {

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />

            <Route element={<ProtectedRoutes/>}>
                <Route path="/add-expense" element={<AddExpense />} />
                <Route path="/" element={<Main />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
        </Routes>
    );
};

export default App;
