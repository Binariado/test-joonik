import React, { useState } from 'react';
import { Container, NavDropdown, Navbar } from 'react-bootstrap';
import Login from 'auth/Login';
import Posts from 'auth/Posts';
import { useSelector, useDispatch } from "react-redux";
import { userAuth } from "redux/actions";
import { useRemember } from 'hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

const AppRouter = () => {


  const [isLoading, Authenticated] = useRemember();



  return (
    <div className="d-flex flex-column">
      {isLoading ? (
        <div>loadin...</div>
      ) : (
          <Router>
            <Container className="nav-user">
              <AuthButton
                isLoading={isLoading}
                Authenticated={Authenticated}
              />
            </Container>
            <Switch>
              <LoginNotRoute path="/login">
                <Login />
              </LoginNotRoute>
              <PrivateRoute path="/">
                <Posts />
              </PrivateRoute>
              <PrivateRoute path="/post">
                <Posts />
              </PrivateRoute>
            </Switch>
          </Router>
        )}
    </div>
  );
}
export default AppRouter;

const fakeAuth = {
  signout(cb) {
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(new Date().getTime())
  let history = useHistory();

  const authUser = useSelector((state) => state.userAuth);


  return authUser.isAuthenticated ? (
    <Navbar bg="" expand="lg">
      <NavDropdown title="User" id="basic-nav-dropdown">
        <NavDropdown.Item 
        className="text-decoration-none" 
        onClick={() => {
          authUser.isAuthenticated = false;
          dispatch(userAuth(authUser));
          localStorage.setItem("userAuth", JSON.stringify({}));
          fakeAuth.signout(() => {
            history.push("/login")
            setTimeout(() => {
              setRefresh(new Date().getTime())
            }, 100);
          });
        }}
        >
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </Navbar>
  ) : (
      <p></p>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {

  const authUser = useSelector((state) => state.userAuth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authUser.isAuthenticated ? (
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

function LoginNotRoute({ children, ...rest }) {

  const authUser = useSelector((state) => state.userAuth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !authUser.isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}


