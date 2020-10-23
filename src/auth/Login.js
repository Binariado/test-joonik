import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useForm, useToken } from 'hooks';
import { useSelector, useDispatch } from "react-redux";
import { userAuth } from "redux/actions";
//import Error from 'Err';
import {TOKEN_EXPIRED} from 'Err/typeError';

import {
  useHistory,
  useLocation
} from "react-router-dom";

import 'sass/login.scss';

const Login = () => {
  const dispatch = useDispatch();

  let history = useHistory();
  let location = useLocation();

  const [loading, setLoading] = useState(false);
  let { from } = location.state || { from: { pathname: "/" } };
  //const [errView, setErrView] = useState(false);
  const authUser = useSelector((state) => state.userAuth);
 
  const [emailToken, setEmailToken] = useState(null);

  const [formValue, handleInputChange] = useForm({
    email: '',
    password: ''
  });

  const { email, password } = formValue;

  const textBtn = {
    password: 'SIGN IN',
    email: 'NEXT',
  }

  const [response, handleemailToken] = useToken({
    email,
    password,
    emailToken
  });

  const authenticate = (cb, dataUser) => {
    authUser.isAuthenticated = true;
    const data = {
      ...authUser,
      ...dataUser
    };
    dispatch(userAuth(data));
    localStorage.setItem("userAuth", JSON.stringify(data));
    setTimeout(cb, 100); // fake async
  };

  const signout = (cb) => {
    authUser.isAuthenticated = false;
    setTimeout(cb, 100);
  };

  const _handleemailToken = (obj) => {
    setLoading(true);
    handleemailToken(obj)
      .then(({result, name, token}) => {
        //console.log(data)
        if(result){
          setEmailToken(result);
        }
        if(token){
          const dataUser = {
            name,
            token
          };
          authenticate(()=>{
            history.replace(from);
          },dataUser);
        }
        setLoading(false);
      })
  }

  const typeName = !emailToken ? "email" : 'password';
  const value = !emailToken ? email : password;
  const v = (typeName === 'email' ? !email : !password);

  const { error } = {...response};

  const _error = () => {
    //console.log(error);
    switch (error) {
      case TOKEN_EXPIRED:
          setEmailToken(null);
        break;
      default:
        break;
    }
  }

  useEffect(()=>{
    if(error)
      _error();
  },[error]);
  
  //console.log({...response})
  return (
    <Container className="content-login d-flex flex-column justify-content-center align-items-center">
      {/* {errView && (
        <Error  
          ignore={BAD_EMAIL}
          {...error} 
        />
      )} */}
      {emailToken && (
        <div className="d-flex mb-3 justify-content-center">
          <p>{email}</p>
        </div>
      )}
      <div className="form-group mb-5  inpt-text">
        <Form.Label htmlFor="email" className="mb-2">
          {typeName.toUpperCase()}
        </Form.Label>
        <Form.Control
          type={typeName}
          name={typeName}
          value={value}
          onChange={(e) => handleInputChange(e)}
          className={`form-control ${ error ? 'is-invalid': ''} rounded-pill`}
        />
        <div className="invalid-feedback">
          {error ? error : ''}
        </div>
      </div>
      <div className="d-flex justify-content-center btn-text">
        <Button
          className="btn-style rounded-pill"
          variant="secondary"
          onClick={ () => _handleemailToken({ email, password, emailToken }) }
          disabled={loading || v}
        >
          {loading ? 'Loading...' : textBtn[typeName]}
        </Button>
      </div>
    </Container>
  );
}

export default Login;