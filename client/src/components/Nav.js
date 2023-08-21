import React from "react";
import { NavLink } from "react-router-dom";

function Nav({logout}) {

    return(
        <div className="nav-bar">
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/browse'>Browse</NavLink>
            <NavLink to='/liquors'>Liquors</NavLink>
            <NavLink to='/my_bar'>Ingredient Search</NavLink>
            <NavLink to='/my_drinks'>My Drinks</NavLink>
            <NavLink onClick={logout} to='/'>Logout</NavLink>
        </div>
    )
}

export default Nav