import React from "react";
import BrowseItem from "./BrowseItem";

function BrowseWrapper({drinks, focusSelector}) {

    const drink = drinks.map((drink) => {
        return <BrowseItem key={drink.id} drink={drink} focusSelector={focusSelector} />
    })

    return(
        // <div className="content">
            <div className="browse-grid">
                {drink}
            </div>
        // </div>
    )
}

export default BrowseWrapper