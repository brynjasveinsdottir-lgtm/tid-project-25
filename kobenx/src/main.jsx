import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Parse from "parse";
import "./index.css";

import RequireAuth from "./loginauth";
import SideBarNav from "./components/sideBar/SideBarNav.jsx";
import Home from "./Pages/HomePage.jsx";
import Threads from "./Pages/Threads.jsx";
import ThreadOpen from "./Pages/ThreadOpen.jsx";
import Events from "./Pages/Events.jsx";
import Places from "./Pages/Places.jsx";
import Profile from "./Pages/Profile.jsx";
import LogIn from "./Pages/LogIn";
import Search from "./Pages/Search.jsx";

Parse.initialize(
  "x3ce58LMkfZDdTkNrBVQ4PvlYX4uHPkx4A4i8S8U",
  "j6YEP0IKyvroB5SaRBMNNKzGQPoKqzEHgpwpJNfn"
);
Parse.serverURL = "https://parseapi.back4app.com";

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
      { path: "/search", element: <Search /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
