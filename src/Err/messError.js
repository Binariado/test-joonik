import React from 'react';
import { Alert } from 'react-bootstrap';

const Alerts = ({mess}) => {

  return (
    <Alert variant={'danger'}>
      {mess}
    </Alert>
  );
}

const MessError = (resp) => {
  
  const {error} = resp;
  console.log(error,'err');
  return (
    <Alerts mess={error}/>
  );
}

export default MessError;