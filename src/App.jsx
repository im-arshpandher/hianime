import React from "react";
import Mainpage from "./Mainpage";
import MovieDetails from "./pages/MovieDetails";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Watch from "./pages/Watch";
import Similar from "./pages/Similar";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Guard from "./Guard";
import GuardAuth from "./GuardAuth";
import { Provider } from "react-redux";
import store from "./redux/store";
import UserProfile from "./pages/auth/Profile";
import SearchPage from "./pages/Search";
import AdminAuth from "./admin/auth/AdminAuth";
import Admin from "./admin/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Guard>
        <Mainpage />
      </Guard>
    ),
  },
  {
    path: "/movie/:mid",
    element: <MovieDetails />,
  },
  {
    path: "/watch/:mid",
    element: <Watch />,
  },
  {
    path: "/similar/:genre_mid",
    element: <Similar />,
  },
  {
    path: "/auth/profile",
    element: (
   
        <UserProfile />
      
    ),
  },
  {
    path: "/auth/login",
    element: (
      <GuardAuth>
        <Login />
      </GuardAuth>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <GuardAuth>
        <Register />
      </GuardAuth>
    ),
  },
  {
    path: "/search",
    element: (

        <SearchPage />
    
    ),
  },
  {
    path: "/admin/*",
    element: (<GuardAuth>
        <AdminAuth><Admin/></AdminAuth>
      </GuardAuth>),
    // children: [
    //   {
    //     index: true, 
    //     element: <Navigate to="dashboard" replace />,
    //   },
    //   { path: "dashboard", element: <Dashboard /> },
    //   { path: "users", element: <Users /> },
    //   { path: "services", element: <ServicesAdmin /> },
    //   { path: "messages", element: <Messages /> },
    //   { path: "candidates", element: <Candidates /> },
    //   { path: "settings", element: <Settings /> },
    // ],
  },

]);

const App = () => {
  return (
    <Provider store={store}>
      <div className="bg-[#201f31] w-full m-h-screen">
        <RouterProvider router={router} />
        {/* <Mainpage/> */}
        {/* <MovieDetails /> */}
      </div>
    </Provider>
  );
};

export default App;
