import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { tokenEmail, singIn, posts } from "helpers";
import { userAuth, posts as dataPosts } from "redux/actions";

const useToken = () => {
  const [dataAuth, setToken] = useState({
    result: null
  });

  const handleTokenEmail = async ({ email, password, emailToken }) => {
    try {
      const data = emailToken ? await singIn(password, emailToken) :  await tokenEmail(email);
      setToken(data);
      return data;
    } catch (err) {
      console.log(err);
      setToken({
        result: null
      });
    }
  };

  return [dataAuth, handleTokenEmail ];
}

const useRemember = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const authUser = useSelector((state) => state.userAuth);

  const { isAuthenticated } = authUser;
  const [auth, setAuth] = useState(authUser);
  

  const handleValidToken = async ({ token }) => {
    try {
      const data = token? await posts(token):{error:'bad token'};
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    if(loading){
      const usuario = JSON.parse(localStorage.getItem('userAuth'));
      if(usuario && !isAuthenticated){
        handleValidToken(usuario)
        .then((resp)=>{
          const {error} = resp;
          if(!error){
            authUser.isAuthenticated = true;
            const data = {
              ...authUser,
              ...usuario
            };
            dispatch(userAuth(data));
            dispatch(dataPosts(resp));
            localStorage.setItem("userAuth", JSON.stringify(data));
            setAuth(data);
          }
          setLoading(false);
        })
      }
    }
  }, [isAuthenticated])

  return [loading, auth];
}

export {
  useToken,
  useRemember
};
