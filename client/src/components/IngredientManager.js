import React, { useEffect, useState } from "react";

function IngredientManager({currentUser, ingredients, userIngredients, setUserIngredients, addMyIngredients, deleteMyIngredients}) {

    const [ingredientType, setIngredientType] = useState("")

    function handleIngredientType(event) {
        setIngredientType(event.target.value)
    }

    const filteredIngredients = ingredients.filter((ingredient) => {
        if (ingredientType === ""){
            return true
        }
        return ingredient.type === ingredientType
    })

    const [userIngredientType, setUserIngredientType] = useState("")

    function handleUserIngredientType(event){
        setUserIngredientType(event.target.value)
    }

    const filteredUserIngredients = userIngredients.filter((ingredient) => {
        if (userIngredientType === ""){
            return true
        }
        return ingredient.ingredient.type === userIngredientType
    })

    const ingredient = filteredIngredients.map(ingredient => {
        return <p onClick={addMyIngredients} id={ingredient.id} key={ingredient.id}>{ingredient.name}</p>
    })

    const userIngredient = filteredUserIngredients.map(userIngredient => {
        return <p onClick={deleteMyIngredients} id={userIngredient.id} key={userIngredient.id}> {userIngredient.ingredient.name}</p>
    })


    return(
        <div className="ingredients-grid">
            <div>
                <select onChange={handleIngredientType}>
                    <option value="">All Ingredients</option>
                    <option value="Liquor">Liquor</option>
                    <option value="Mixer">Mixer</option>
                    <option value="Garnish">Garnish</option>
                </select>
                <div className="ingredients-menu">
                    <h2>Ingredients List</h2>
                    {ingredient}
                </div>
            </div>
            <div>
                <select onChange={handleUserIngredientType}>
                    <option value="">All Ingredients</option>
                    <option value="Liquor">Liquor</option>
                    <option value="Mixer">Mixer</option>
                    <option value="Garnish">Garnish</option>
                </select>
                <div className="ingredients-menu">
                    <h2>My Ingredients</h2>
                    {userIngredient}
                </div>
            </div>
        </div>
    )
}

export default IngredientManager