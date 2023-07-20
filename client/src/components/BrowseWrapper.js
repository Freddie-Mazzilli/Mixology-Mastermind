import React from "react";
import BrowseItem from "./BrowseItem";

function BrowseWrapper({drinks}) {

    const drink = drinks.map((drink) => {
        return <BrowseItem key={drink.id} drink={drink} />
    })

    return(
        <div className="browse-grid">
            {drink}
        </div>
    )
}

export default BrowseWrapper