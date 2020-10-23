import React from 'react';
import { Provider } from "react-redux";
import store from "redux/store";
//import logo from './logo.svg';
import './sass/App.scss'
import AppRouter from './router';

function App() {

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
