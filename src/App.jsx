import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "./pages/Product";
import Add from "./pages/Add";
import Search from "./pages/Search";
import Update from "./pages/Update";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import NotAllow from "./pages/NotAllow";
import ProtectedRouteSearch from "./pages/ProtectedRouteSearch";
import AdminRoute from "./pages/AdminRoute";
import Layout from "./components/Layout";
import Details from "./pages/Details";
import ProtectedRouteDetails from "./pages/ProtectedRouteDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Product />} />
          <Route
            path="add"
            element={
              <AdminRoute>
                <Add />
              </AdminRoute>
            }
          />
          <Route
            path="search"
            element={
              <ProtectedRouteSearch>
                <Search />
              </ProtectedRouteSearch>
            }
          />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="logout" element={<Logout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notallow" element={<NotAllow />} />
          <Route
            path="update/:productId"
            element={
              <AdminRoute>
                <Update />
              </AdminRoute>
            }
          />
          <Route path="/details/:productId" element={
            <ProtectedRouteDetails>
              <Details />
            </ProtectedRouteDetails>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
