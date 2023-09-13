import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import Random from './pages/Random.jsx';
import ErrorPage from "./pages/ErrorPages.jsx";
import onFixingPage from './pages/onFixingPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/random/:studentID",
    element: <Random />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/maintane",
    element: <onFixingPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);