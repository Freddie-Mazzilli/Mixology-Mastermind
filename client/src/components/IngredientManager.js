import React, { useEffect } from "react";

function IngredientManager({currentUser, ingredients, userIngredients, setUserIngredients, addMyIngredients, deleteMyIngredients}) {

    const ingredient = ingredients.map(ingredient => {
        return <p onClick={addMyIngredients} id={ingredient.id}>{ingredient.name}</p>
    })

    const userIngredient = userIngredients.map(userIngredient => {
        return <p onClick={deleteMyIngredients} id={userIngredient.id}>{userIngredient.id}. {userIngredient.ingredient.name}</p>
    })


    return(
        <div className="ingredients-grid">
            <div>
                <div className="ingredients-menu">
                    <h2>Ingredients List</h2>
                    {ingredient}
                </div>
            </div>
            <div>
                <div className="ingredients-menu">
                    <h2>My Ingredients</h2>
                    {userIngredient}
                </div>
            </div>
        </div>
    )
}

export default IngredientManager