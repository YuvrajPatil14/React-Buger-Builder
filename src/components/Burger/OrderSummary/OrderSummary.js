import React,{Component} from "react";
import Aux from "../../../hoc/Aux";
import Button from  '../../UI/Button/Button';


class OrderSummary extends Component {
  // componentWillUpdate(){
  //   console.log('order summary will update');
    
  // }
  render(){
    const ingSummary = Object.keys(this.props.ingridients).map(ingkey => {
      return (
        <li key={ingkey}>
          <span style={{ textTransform: "capitalize" }}>{ingkey}</span>:
          {this.props.ingridients[ingkey]}
        </li>
      );
    });
    return(
      <Aux>
      <h3 style={{
        backgroundColor:' #4d90fe',
        marginLeft: '20%',
        marginRight: '20%',
        borderRadius: '20px',
        color: 'white',
        padding: '5px',
      }}>Your Order</h3>
      <p>Ingridients:</p>
      <ul style={{listStyle:'none' , paddingLeft:'0px' ,}}>{ingSummary}</ul>
  <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout??</p>
      <Button clicked={this.props.purchaseCanceled}  btnType='Danger'>CANCLE</Button>
      <Button clicked={this.props.purchaseContinue}  btnType='Success'>CONTINUE</Button>
    </Aux>
    );
  }
 
};
export default OrderSummary;
