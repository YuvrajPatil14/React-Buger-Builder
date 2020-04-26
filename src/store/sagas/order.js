import { put } from "redux-saga/effects";

import * as actions from "../actions/index";
import axios from "../../axios-orders";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );

    yield put(
      actions.purchaseBurgerSucess(response.data.name, action.orderData)
    );
  } catch (err) {
    yield put(actions.purchaseBurgerFail(err));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrderStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';

  try {
    const response = yield axios.get("/orders.json" + queryParams);
    console.log(response[1]);

    const fetchedData = [];
    for (let key in response.data) {
      fetchedData.push({ ...response.data[key], id: key });
    }
    yield put(actions.fetchOrderSuccess(fetchedData));
    // this.setState({ loading: false , orders:fetchedData });
  } catch (err) {
    //this.setState({ loading: false });
    yield put(actions.fetchOrderFail(err));
  }
}
