import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([{
    element: <App />, children: [
        {
            path: "/",
            element: <Login />,
        },
        {
            path: '/register',
            element: <Register />,
        },
        {
            path: '/dashboard',
            element: <Dashboard />,
        }
    ],
}]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
