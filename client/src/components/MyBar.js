import React, { useEffect } from "react";
import { useState } from "react";
import BrowseItem from "./BrowseItem";

function MyBar({userIngredients, drinks, deleteMyIngredients, addMyIngredients, user}) {

    const [myBarDrinks, setMyBarDrinks] = useState([])

    const [ingredientList, setIngredientList] = useState([])

    
    const option = myBarDrinks.map(drink => {
        return <BrowseItem key={drink.id} drink={drink} />
    })


    return(
        <div className="browse-grid">
            {option}
        </div>
    )
}

export default MyBar