import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token, 
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
export const checkAuthTimeOut = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime*1000 );
  };
};


export const setAuthRedirectPath = (path) => {
  return{
    type:actionTypes.SET_AUTH_REDIRECT_PATH,
    path:path
  }
}


export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnVd5S9RghVPsmRf1P53wVxbBvdU6XxHg";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnVd5S9RghVPsmRf1P53wVxbBvdU6XxHg";
    }
    axios
      .post(url, authData)
      .then(response => {
        //console.log(response);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn *1000);
        localStorage.setItem('token',response.data.idToken);
        //console.log(typeof expirationDate);
        
        localStorage.setItem('expirationDate',expirationDate);
        localStorage.setItem('userId',response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch(err => {
        //console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };

};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if(!token) {
      dispatch(logout());
    }
    else{
      const expirationDate = localStorage.getItem('expirationDate');
      //console.log( Date.parse(expirationDate) - new Date().getTime());
      if(expirationDate <= new Date())
      {
        dispatch(logout())
        }
      else{
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token,userId));
        
        //heere expirationDate is string and hence it getTime cannot be called
        //following function is dispatched to keep checking the expration time
       dispatch(checkAuthTimeOut( (Date.parse(expirationDate) - new Date().getTime())/1000))
      
      }
    }
  }
}













// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyBnVd5S9RghVPsmRf1P53wVxbBvdU6XxHg",
//     authDomain: "react-b-builder.firebaseapp.com",
//     databaseURL: "https://react-b-builder.firebaseio.com",
//     projectId: "react-b-builder",
//     storageBucket: "react-b-builder.appspot.com",
//     messagingSenderId: "1051810403795",
//     appId: "1:1051810403795:web:107c5ef978f3d89a694b26",
//     measurementId: "G-7GX95PMHMR"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>
