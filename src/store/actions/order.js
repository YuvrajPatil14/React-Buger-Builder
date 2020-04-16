import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const purchaseBurgerSucess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData,token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth="+token, orderData)
      .then((res) => {
        dispatch(purchaseBurgerSucess(res.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = () => {
  return {
    type:actionTypes.PURCHASE_INIT,
  };
};


export const fetchOrderSuccess = (orders) => {
  return{
    type:actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
}
export const fetchOrderFail = (error) => {
  return{
    type:actionTypes.FETCH_ORDERS_FAIL,
    error
}
}

export const fetchOrderStart = () => {
  return{
    type: actionTypes.FETCH_ORDERS_START,

  }
}

export const fetchOrders = (token,userId)=> {
  return dispatach => {
    dispatach(fetchOrderStart());
    const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
    axios
    .get("/orders.json"+queryParams)
    .then(res => {
        console.log(res.data);
        const fetchedData= [];
        for (let key in res.data){
          fetchedData.push({...res.data[key],id:key});
        }
        dispatach(fetchOrderSuccess(fetchedData));
     // this.setState({ loading: false , orders:fetchedData });
    })
    .catch(err => {
      //this.setState({ loading: false }); 
      dispatach(fetchOrderFail(err));
      
    });
  }
}