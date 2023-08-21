import React, { useEffect, useState } from "react";

function Focus({focusDrink, addMyDrinks}) {

    const [selectedDrink, setSelectedDrink] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/drinks/${focusDrink}`)
        .then(res => res.json())
        .then(selectedDrink => setSelectedDrink(selectedDrink))
    }, [])

    if(!selectedDrink.ingredients){
        return(
            <h1>Loading...</h1>
        )
    }

    const ingredient = selectedDrink.ingredients.map(ingredient => {
        return (
            <p>| {ingredient} |</p>
        )
    })

    return(
        <div className="drink-focus-container">
            <div className="drink-focus">
                <div className="focus-main">
                    <h2>{selectedDrink.name}</h2>
                    <img src={selectedDrink.image} alt={selectedDrink.id}/>
                </div>
                <div className="focus-ingredient">
                    {ingredient}
                </div>
                <p>{selectedDrink.instructions}</p>
                <button className="button" id={selectedDrink.id} onClick={addMyDrinks}>Add to My Drinks</button>
            </div>
        </div>
    )
}

export default Focus