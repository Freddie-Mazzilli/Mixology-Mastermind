import React from "react";

function NewDrink({selectedDrink}) {

    if (selectedDrink.ingredients === "" && selectedDrink.image === ""){
        return (
            <div className="drink-focus-container">
                <div className="drink-focus">
                    <div className="focus-main">
                        <h2>{selectedDrink.name}</h2>
                    </div>
                    <p>{selectedDrink.instructions}</p>
                </div>
            </div>
        )
    }

    const ingredientsArray = Array.isArray(selectedDrink.ingredients) ? selectedDrink.ingredients : selectedDrink.ingredients.split(", ")
    console.log(ingredientsArray)

    const ingredient = ingredientsArray.map(ingredient => {
        // console.log(ingredient)
        if (ingredient.includes(';')){
            const [ingredientQuantity, ingredientName] = ingredient.split('; ')
            console.log(ingredientName)
            return (
                <p>| {ingredientQuantity} of {ingredientName} |</p>
            )
        }
        return (
            <p>| {ingredient} |</p>
        )
    })

    if (selectedDrink.image === ""){
        return(
            <div className="drink-focus-container">
                <div className="drink-focus">
                    <div className="focus-main">
                        <h2>{selectedDrink.name}</h2>
                    </div>
                    <div className="focus-ingredient">
                        {ingredient}
                    </div>
                    <p>{selectedDrink.instructions}</p>
                </div>
            </div>
        )
    }
    return (
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
            </div>
        </div>
    )
}

export default NewDrink

