import React, { useState } from "react";

function ChangeIngredient({ingredients}) {

    const [selectedIngredient, setSelectedIngredient] = useState({})

    const ingredient = ingredients.map((ingredient) => {
        return <option key={ingredient.id} value={ingredient}>{ingredient.name}</option>
    })

    function handleSelectedIngredient(event) {
        setSelectedIngredient(event.target.value)
        console.log(selectedIngredient)
    }

    return(
        <>
        <select onChange={handleSelectedIngredient}>
            {ingredient}
        </select>
        <form>
            <input value="name" type="text">{selectedIngredient.name}</input>
            <input value="type" type="text">{selectedIngredient.type}</input>
        </form>
        </>
    )
}

export default ChangeIngredient