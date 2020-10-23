import { URL } from './const';

export const api = {
  async email(email) {
    try {
      const res = await fetch(`${URL}login/email`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email
        })
      });
      const response = await res.json();
      return {
        resp: response,
        status: res.status
      }
    } catch (error) {
      //console.log("Authenticate error", error);
    }
  },
  async singIng(password, emailToken) {
    try {
      const res = await fetch(`${URL}login/password`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${emailToken}`,
        },
        body: JSON.stringify({
          password: password
        })
      });
      const response = await res.json()
      return {
        resp: response,
        status: res.status
      }
    } catch (error) {
      console.log("Authenticate error", error);
    }
  },
  async posts(token) {
    try {
      const res = await fetch(`${URL}posts`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      const response = await res.json()
      return {
        resp: response,
        status: res.status
      }
    } catch (error) {
      console.log("Authenticate error", error);
    }
  },
  async postsCreate({ token, image, title, content }) {
    try {
      console.log({ token, image, title, content },'ds');
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var formdata = new FormData();
      formdata.append("image", image);
      formdata.append("title", title);
      formdata.append("content", content);
      

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      const res = await fetch(`${URL}posts`, requestOptions);
      const response = await res.json()
      return {
        resp: response,
        status: res.status
      }
    } catch (error) {
      console.log("Authenticate error", error);
    }
  }
}