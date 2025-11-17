import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import SideBarNav from './components/SideBarNav.jsx'
import Home from './Pages/HomePage.jsx'
import Threads from './Pages/Threads.jsx'
import ThreadOpen from "./Pages/ThreadOpen.jsx"
import Events from './Pages/Events.jsx'
import Places from './Pages/Places.jsx'
import Profile from './Pages/Profile.jsx'
import LogIn from './Pages/LogIn'
import Parse from "parse"
import RequireAuth from './loginauth'


Parse.initialize("NJWaTl5KAfW9YpXza0hBThItPeTOoUzjxXvmusKC", "5P6trcxyUbGHTeIpG6wvEC26LjG8eClqrh95PBmL");
Parse.serverURL = 'https://parseapi.back4app.com'

// This defines the skeleton of the site, the things that don't change. The Outlet in this is each page's content.
function AppLayout() {
  return (
    <RequireAuth>
      <div className="app-shell">
        <SideBarNav />
        <main className="main-content-area">
          <Outlet />
        </main>
      </div>
    </RequireAuth>
  );
}

// Routes to the different pages.
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/threads", element: <Threads /> },
      { path: "/threadOpen/:id", element: <ThreadOpen /> },
      { path: "/events", element: <Events /> },
      { path: "/places", element: <Places /> },
      { path: "/profile", element: <Profile /> },
      { path: "/login", element: <LogIn /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);