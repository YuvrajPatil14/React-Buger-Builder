import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
//import BuildControl from '../../components/Burger/BuildControls/BuildControl/BuildControl';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
//import burger from "../../components/Burger/Burger";
const ING_PRICES = {
  salad: 0.5,
  bacon: 0.3,
  cheese: 1.3,
  meat: 0.8
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error:false
  };
  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(err=>{
        this.setState({error:true})
      });
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  addIngridientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngridients = {
      ...this.state.ingredients
    };
    updatedIngridients[type] = updatedCount;
    const priceAddition = ING_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngridients });
    this.updatePurchaseState(updatedIngridients);
  };
  removeIngridientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngridients = {
      ...this.state.ingredients
    };
    updatedIngridients[type] = updatedCount;
    const priceDeduction = ING_PRICES[type];
    const newPrice = this.state.totalPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngridients });
    this.updatePurchaseState(updatedIngridients);
  };
  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
    console.log("called", sum);
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    
    const queryParams = [];
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price='+this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname:'/checkout',
      search:'?'+ queryString
    });

  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error?<p>can't load ingridients</p>:<Spinner/>
    if(this.state.ingredients)
    {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
  
          <BuildControls
            ingAdded={this.addIngridientHandler}
            ingRemoved={this.removeIngridientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
          
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingridients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );

    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
