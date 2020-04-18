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
import {connect} from 'react-redux';
import * as actions from "../../store/actions/index";

export class BurgerBuilder extends Component {
  state = {
   
    purchasing: false,
   
  };
  componentDidMount() {
    //console.log('did_mount',this.props);
    this.props.onInitIngredients();
   
  }
  purchaseHandler = () => {
    if(this.props.isAuthenticated)
    {
      this.setState({ purchasing: true })
    }
    else{
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
    
  };
  // addIngridientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngridients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngridients[type] = updatedCount;
  //   const priceAddition = ING_PRICES[type];
  //   const newPrice = this.state.totalPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngridients });
  //   this.updatePurchaseState(updatedIngridients);
  // };
  // removeIngridientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngridients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngridients[type] = updatedCount;
  //   const priceDeduction = ING_PRICES[type];
  //   const newPrice = this.state.totalPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngridients });
  //   this.updatePurchaseState(updatedIngridients);
  // };
  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return  sum > 0 ;
    
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push({
      pathname:'/checkout'
    });

  };
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error?<p>can't load ingridients</p>:<Spinner/>
   // console.log(this.props.ings)
    if(this.props.ings)
    {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
  
          <BuildControls
            ingAdded={this.props.onIngredientAdded}
            ingRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
          
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingridients={this.props.ings}
          price={this.props.price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );

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
const mapStateToProps = (state)=>{
 return{
  ings:state.burgerBuilder.ingredients,
  price:state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated : state.auth.token !== null,
 } 

};
const mapDispatchToProps = dispatch =>{
  return{
      onIngredientAdded:(ingName) => dispatch(actions.addIngredient(ingName)),
      onIngredientRemoved:(ingName) => dispatch(actions.removeIngredient(ingName)),
      onInitIngredients: ()=> dispatch(actions.initIngredients()),
      onInitPurchase: ()=> dispatch(actions.purchaseInit()),
      onSetAuthRedirectPath: (path)=>dispatch(actions.setAuthRedirectPath(path))

  }
}
export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));
