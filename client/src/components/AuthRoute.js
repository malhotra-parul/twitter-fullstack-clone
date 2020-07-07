import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AuthRoute = ({ component: Component, authenticatedRedux, ...rest }) => {
  const [auth, setAuth] = useState(false);
  
  useEffect(() => {
    setAuth(authenticatedRedux)
  }, [authenticatedRedux]);

  console.log(auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Redirect to="/feed" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  authenticatedRedux: state.user.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
