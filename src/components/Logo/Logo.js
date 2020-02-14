import React from 'react';
import Burgerlogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';
const logo = (props)=>{


    return(
        <div className={classes.Logo}>
            <img src={Burgerlogo} alt='MyBurger'/>
        </div>
    );
};
export default logo;