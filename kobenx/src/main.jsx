import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import SideBarNav from './components/SideBarNav.jsx'
import Home from './Pages/HomePage.jsx'
import Threads from './Pages/Threads.jsx'
import Events from './Pages/Events.jsx'
import Places from './Pages/Places.jsx'
import './App.css'

// This defines the skeleton of the site, the things that don't change. The Outlet in this is each page's content.
function AppLayout() {
  return (
    <div className="app-shell">
      <SideBarNav />
      <main className="main-content-area">
        <Outlet />
      </main>
    </div>
  );
}

// Routes to the different pages.
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/threads", element: <Threads /> },
      { path: "/events", element: <Events /> },
      { path: "/places", element: <Places /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// For tomorrow make the SideBarStyle.css, and try filling out a page.