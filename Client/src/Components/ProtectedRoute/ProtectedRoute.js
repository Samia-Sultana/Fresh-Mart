import {
    BrowserRouter as Router,
    Route,
    Redirect
  } from "react-router-dom";

const PrivateRoute =({ children, ...rest }) =>{
    return (
      <Route
        {...rest}
        render={({ location }) =>
          sessionStorage.getItem('email') === process.env.REACT_APP_ADMIN_EMAIL ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;