import React from "react"
import { NavLink } from "react-router-dom"

function Footer() {

    return(
        <div className="footer">
            <p>A Mixed Drink application by Fredrick Mazzilli</p>
            <p className="smallest"><NavLink to='/modify'>@</NavLink>FM 2023</p>
            <p className="smallest">All rights reserved</p>
        </div>
    )
}

export default Footer