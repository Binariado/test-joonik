import React from 'react';
import MessError from './messError';

const Err = (err) =>{
  return <MessError {...err} />
}

export default Err;