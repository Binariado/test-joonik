import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { postsCreate } from "helpers";
import { posts as dataPosts } from "redux/actions";
import { posts } from "helpers";
import { useForm } from 'hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import _ from "lodash";
import 'sass/post.scss';

const Posts = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [newItem, setNewItem] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postsList = useSelector((state) => state.posts);
  const authUser = useSelector((state) => state.userAuth);

  let history = useHistory();

  const getPosts = async ({ token }) => {
    try {
      const data = token? await posts(token):{error:'bad token'};
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    if(postsList.length === 0){
      setLoading(true);
      getPosts(authUser)
      .then((resp)=>{
        const {error} = resp;
        if(!error){
          dispatch(dataPosts(resp));
          //window.location.reload();
        }
        setLoading(false);
        
      })
    }
  },[postsList])

  const [formValue, handleInputChange] = useForm({
    image: '',
    title: '',
    content: ''
  });

  const { image, title, content } = formValue;

  const savePost = async () => {
    const data = {
      ...formValue,
      token: authUser.token
    }
    
    const resp = await postsCreate(data)
    .then((resp)=>{
      const {error} = resp;
      if(!error){
        setNewItem(resp);

        setTimeout(() => {
          setNewItem(null);
        }, 400);
      }
      //console.log(resp);
      handleClose();
    });

  }
  console.log(newItem);
  return (
    <React.StrictMode>
      <Container className="content-post pt-5 mb-4 pb-5">
        <div>
          {
            newItem &&(
              <Card {...newItem} />
            )
          }
          {
            _.map(postsList, (post, idx) => <Card key={idx} {...post} />)
          }
        </div>
        <div className="d-flex justify-content-center p-4 btn-add">

          <Button
            className="btn-style rounded-pill"
            variant="secondary"
            onClick={handleShow}
          >
            ADD NEW
        </Button>

        </div>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group>
              <Form.Label>Url Image</Form.Label>

              <Form.File  name="image" label="Example file input" onChange={(e) => handleInputChange(e)} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" value={title} type="text" placeholder="Title"
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control name="content" value={content} as="textarea" rows={3}
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={savePost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.StrictMode>
  )
}



const Card = (props) => {
  return (
    <div className="post d-flex post d-flex pb-2 pt-2 pl-1 pr-1 mb-3">
      <div className="conte-img">
        <div className="img">
          <div className="post-cap"></div>
          <div>
            <img className="loaded" alt="" src={props.image} />
          </div>
        </div>
      </div>
      <div className="conten-text d-flex flex-column">
        <p className="post-title">{props.title}</p>
        <p className="post-text-conte text-break">
          {props.content}
        </p>
      </div>
    </div>
  )
}

export default Posts;