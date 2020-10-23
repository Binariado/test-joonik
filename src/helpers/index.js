import { api } from 'api';

const respFormat = (data) => {
  const { resp, status } = data;
  const { error } = resp;
  if(!error){
    return {
      ...resp
    };
  }
  return {...resp, status};
}

const tokenEmail = async (email) => {
  try {
    const data = await api.email(email);
    return respFormat(data);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const singIn = async (password, token) => {
  try {
    const data = await api.singIng(password, token);
    return respFormat(data);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const posts = async (token) => {
  try {
    const data = await api.posts(token);
    return respFormat(data);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const postsCreate = async (props) => {
  try {
    const data = await api.postsCreate(props);
    return respFormat(data);
  } catch (err) {
    console.log(err);
    return null;
  }
};

export {
  tokenEmail,
  singIn,
  posts,
  postsCreate
}