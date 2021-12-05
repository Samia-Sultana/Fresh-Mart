import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Admin from './Components/Admin/Admin';
import Home from './Components/Home/Home';
import ManageProduct from './Components/ManageProduct/ManageProduct';
import UserNavbar from './Components/UserNavbar/UserNavbar';
import AdminNavbar from './Components/AdminNavbar/AdminNavbar';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import ReviewOrder from './Components/ReviewOrder/ReviewOrder';
import { createContext, useState } from 'react';
import ShowOrder from './Components/ShowOrder/ShowOrder';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
export const SelectedProduct = createContext();

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  return (
    <SelectedProduct.Provider value={[selectedProducts, setSelectedProducts]}>
    <div className="App">
      <Router>
        <Switch>
          <ProtectedRoute path="/admin">
            <Admin></Admin>
          </ProtectedRoute>
          <ProtectedRoute path="/manage">
            <Admin></Admin>
          </ProtectedRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/signUp">
            <SignUp></SignUp>
          </Route>
          <PrivateRoute path="/reviewOrder">
            <UserNavbar></UserNavbar>
            <ReviewOrder></ReviewOrder>
          </PrivateRoute>
          <PrivateRoute path="/showOrder">
            <UserNavbar></UserNavbar>
            <ShowOrder></ShowOrder>
          </PrivateRoute>
          <Route exact path="/">
            <UserNavbar></UserNavbar>
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </div>
    </SelectedProduct.Provider>
  );
}

export default App;
