import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
//import BuildControl from '../../components/Burger/BuildControls/BuildControl/BuildControl';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const ING_PRICES = {
  salad: 0.5,
  bacon: 0.3,
  cheese: 1.3,
  meat: 0.8
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };
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
    this.setState({purchasing:false})
  }
  purchaseContinueHandler = () => {
    alert('You can continue!!')
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary 
          ingridients={this.state.ingredients} 
          price={this.state.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler} />
        </Modal>
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
  }
}

export default BurgerBuilder;
