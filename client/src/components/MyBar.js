import React, { useEffect } from "react";
import { useState } from "react";
import BrowseItem from "./BrowseItem";

function MyBar({userIngredients, myBarDrinks, user, focusSelector}) {

    const option = myBarDrinks.map(drink => {
        return <BrowseItem key={drink.id} drink={drink} focusSelector={focusSelector} />
    })


    return(
        <div className="bar-grid">
            {option}
        </div>
    )
}

export default MyBar