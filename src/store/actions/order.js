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

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json ", orderData)
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

export const fetchOrders = ()=> {
  return dispatach => {
    dispatach(fetchOrderStart())
    axios
    .get("/orders.json")
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