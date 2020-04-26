import {put, call} from 'redux-saga/effects'
//import* as actionTypes from '../actions/actionTypes'
import * as actions from '../actions/index'
import {delay} from 'redux-saga/effects';
import axios from 'axios'


export function* logoutSaga(action){
  yield call([localStorage,'removeItem'],"token")
  yield call([localStorage,'removeItem'],'expirationDate')
  yield call([localStorage,'removeItem'],'userId')
    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expirationDate');
    // yield localStorage.removeItem('userId');
    yield put(
        actions.logoutSucceed()
     )
} 
export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime * 1000)
    yield put(actions.logout())
}

export function* authUserSaga(action){
    yield put(actions.authStart());
    const authData = {
      email:action.email,
      password:action.password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API]";
    if (!action.isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API]";
    }
    try{
      const response =yield axios.post(url, authData)
    
      //console.log(response);
      const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn *1000);
      yield localStorage.setItem('token',response.data.idToken);
      //console.log(typeof expirationDate);
      yield localStorage.setItem('expirationDate',expirationDate);
      yield localStorage.setItem('userId',response.data.localId);
      yield put(actions.authSuccess(response.data.idToken, response.data.localId));
      yield put(actions.checkAuthTimeOut(response.data.expiresIn));

    } catch(err){
      yield put(actions.authFail(err.response.data.error))
    };
  };


  export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem('token');
    if(!token) {
      yield put(actions.logout());
    }
    else{
      const expirationDate = yield localStorage.getItem('expirationDate');
      //console.log( Date.parse(expirationDate) - new Date().getTime());
      if(expirationDate <= new Date())
      {
        yield put(actions.logout())
        }
      else{
        const userId = yield localStorage.getItem('userId')
        yield put(actions.authSuccess(token,userId));
        
        //heere expirationDate is string and hence it getTime cannot be called
        //following function is dispatched to keep checking the expration time
       yield put(actions.checkAuthTimeOut( (Date.parse(expirationDate) - new Date().getTime())/1000))
      
      }
    }
  }