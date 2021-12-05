import {
    BrowserRouter as Router,
    Route,
    Redirect
  } from "react-router-dom";

const PrivateRoute =({ children, ...rest }) =>{
  console.log(sessionStorage.getItem('email'))
    return (
      <Route
        {...rest}
        render={({ location }) =>
          sessionStorage.getItem('email') ? (
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