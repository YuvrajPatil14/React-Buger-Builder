import * as actionTypes from "./actionTypes";
//import axios from "axios";

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
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');
  //moved to saga
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};
export const logoutSucceed = ()=>{
  return{
    type:actionTypes.AUTH_LOGOUT
  }
}
export const checkAuthTimeOut = expirationTime => {
  return{
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime:expirationTime,
  }
};


export const setAuthRedirectPath = (path) => {
  return{
    type:actionTypes.SET_AUTH_REDIRECT_PATH,
    path:path
  }
}


export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_USER,
    email:email,
    password:password,
    isSignUp:isSignUp,

}
}

export const authCheckState = () => {
  return {
    type:actionTypes.AUTH_CHECK_STATE
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
//     apiKey: "API",
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
