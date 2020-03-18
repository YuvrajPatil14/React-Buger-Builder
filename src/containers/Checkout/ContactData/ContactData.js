import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from '../../../axios-orders';  
import Spinner from '../../../components/UI/spinner/Spinner';
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading:false,
  };
  orderHandler = event => {
    event.preventDefault();
    console.log(this.props.ingredients);
    //alert("You can continue!!");
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "myname",
        address: {
          street: "where",
          zipCode: "154512",
          country: "india"
        },
        email: "email@email.com"
      },
      deliveryMethod: "asap"
    };
    axios
      .post("/orders.json ", order)
      .then(res => {
        this.setState({ loading: false});
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false});
      });
  };
  render() {
      let form = (<form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>);
      if (this.state.loading)
      {
          form = <Spinner/>
      }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    ); 
  }
}
export default ContactData;
