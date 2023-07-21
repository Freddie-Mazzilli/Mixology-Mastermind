import React from "react";

function BrowseItem({drink, focusSelector}) {

    return(
        <div className="browse-card">
            <img onClick={focusSelector} src={drink.image} alt={drink.id} />
            <p>{drink.name}</p>
        </div>
    )
}

export default BrowseItem