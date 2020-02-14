import React, { Component } from "react";
import Aux from "../Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

class Layout extends Component {
state = {
    showSideDrawer:false,
}
SideDrawerClosedHandler = ()=>{
    this.setState({showSideDrawer:false})
}
SideDrawerToggleHandler = ()=> {
    this.setState(prevState => { return {showSideDrawer: !prevState.showSideDrawer}});
}
  render() {
    return (
      <Aux>
        <div>
          <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
          <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
            <Backdrop/>
        </div>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
