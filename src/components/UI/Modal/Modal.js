import React , { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  
  shouldComponentUpdate(nextProps, nextState){
     return (nextProps.show !== this.props.show || nextProps.children !== this.props.children)
  }
  componentWillUpdate()
  {
    console.log('modal will update')
  }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "traslateY(0)" : "traslateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
            marginTop: "-175px",
            paddingRight:'0px',paddingTop:'0px'
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
