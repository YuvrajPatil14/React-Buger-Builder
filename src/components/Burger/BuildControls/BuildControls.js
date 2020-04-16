import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" }
];
const BuildControls = props => (
  <div className={classes.BuildControls}>
    <div className={classes.PriceTag}>
    <p>
      Current Price: {props.price.toFixed(2)}{" "}
    </p>
    </div>
    
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingAdded(ctrl.type)}
        removed={() => props.ingRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button className={classes.OrderButton} 
    disabled={!props.purchasable} 
    onClick={props.ordered}>
      {props.isAuth?'ORDER NOW':'Sign Up to order'}
    </button>
  </div>
);

export default BuildControls;
