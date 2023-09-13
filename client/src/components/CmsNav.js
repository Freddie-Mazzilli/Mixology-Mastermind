import React from "react";
import { NavLink } from "react-router-dom";

function CmsNav(){

    return(
        <div className="nav-bar">
            <NavLink to='/modify/add'>Add Data</NavLink>
            <NavLink to='/modify/change'>Modify Data</NavLink>
        </div>
    )
}

export default CmsNav