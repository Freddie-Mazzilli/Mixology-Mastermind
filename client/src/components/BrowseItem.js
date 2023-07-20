import React from "react";

function BrowseItem({drink}) {

    return(
        <div className="browse-card">
            <img src={drink.image} alt={drink.id} />
            <p>{drink.name}</p>
        </div>
    )
}

export default BrowseItem