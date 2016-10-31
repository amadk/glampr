import React from 'react';
import { Link } from 'react-router'

const SideBar = ({views}) => {

    if ( views === 'user' ) {
        return ( <div className="navBar">    
          <li><Link to="/TripDetailsUser">Trip Details</Link></li>
          <li><Link to="/TermsUser">Terms</Link></li>
          <li><Link to="/ShoppingList">Shopping List</Link></li>
        </div> )
    } else {
        return (
            <div className="navBar"></div>
        )
    }
}

export default SideBar;

// else if ( views === 'maker' ) {
//        return (
//        <div className="navBar">    
//          <li><Link to="/SignIn">Sign In</Link></li>
//          <li><Link to="/SignUp">Sign Up</Link></li>
//          <li><Link to="/TripDetailsMaker">Trip Details</Link></li>
//          <li><Link to="/TermsMaker">Terms</Link></li>
//          <li><Link to="/GearViewMaker">Gear List</Link></li>
//        </div>
//        )
//    } else {
//        return (<div className="navBar"></div>)
//    }