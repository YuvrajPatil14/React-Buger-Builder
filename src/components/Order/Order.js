import React from "react";
import classes from "./Order.css";
const Order = props => {
  const ingredients = [];
  for (let ingName in props.ingredients) {
    ingredients.push({ Name: ingName, amount: props.ingredients[ingName] });
  }
const ingOutput = ingredients.map(ig => {
    return <span
    style={{textTransform:'capitalize',
            display:'inline-block',
            margin:'0 8px',
            border: '1px solid #ccc',
            borderRadius:'5px',
        padding: '5px'}}
    key={ig.Name}>{ig.Name} ({ig.amount})</span> ;
});
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingOutput}</p>
      <p>
        Price: <strong>$ {+props.price.toFixed(2)} </strong>
      </p>
    </div>
  );
};
export default Order;
