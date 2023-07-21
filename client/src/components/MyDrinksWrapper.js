import React from "react";
import MyDrinks from "./MyDrinks"

function MyDrinksWrapper({drinks, focusSelector, deleteMyDrinks}) {

    console.log(drinks)

    const drink = drinks.map((drink) => {
        return <MyDrinks key={drink.drink.id} drink={drink.drink} deleteMyDrinks={deleteMyDrinks} focusSelector={focusSelector} />
    })

    return(
        <div className="browse-grid">
            {drink}
        </div>
    )
}

export default MyDrinksWrapper