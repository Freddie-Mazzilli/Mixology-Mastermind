import React from "react";

function MyDrinks({drink, focusSelector, deleteMyDrinks}) {

    return(
        <div className="browse-card">
            <img onClick={focusSelector} src={drink.image} alt={drink.id} />
            <p>{drink.name}</p>
            <button id={drink.id} className="button" onClick={deleteMyDrinks}>Delete this Drink</button>
        </div>
    )
}

export default MyDrinks