import React from "react";

function MyDrinks({drink, focusSelector, deleteMyDrinks}) {

    return(
        <div>
            <div className="browse-card">
            <button id={drink.id} className="delete" onClick={deleteMyDrinks}>X</button>
                <img onClick={focusSelector} src={drink.image} alt={drink.id} />
                <p>{drink.name}</p>
            </div>
        </div>
    )
}

export default MyDrinks