import React from "react";

function IngredientManager({currentUser, ingredients, userIngredients, setUserIngredients, addMyIngredients, deleteMyIngredients}) {

    const ingredient = ingredients.map(ingredient => {
        return <p onClick={addMyIngredients} id={ingredient.id}>{ingredient.name}</p>
    })

    const userIngredient = userIngredients.map(userIngredient => {
        console.log(userIngredient)
        return <p onClick={deleteMyIngredients} id={userIngredient.id}>{userIngredient.id}. {userIngredient.ingredient.name}</p>
    })


    return(
        <div className="ingredients-grid">
            <div>
                <h2>Ingredients List</h2>
                {ingredient}
            </div>
            <div>
                <h2>My Ingredients</h2>
                {userIngredient}
            </div>
        </div>
    )
}

export default IngredientManager