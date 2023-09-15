import React, { useState, useEffect } from "react";

function ChangeIngredient({ingredients, fetchIngredients}) {

    const [selectedIngredient, setSelectedIngredient] = useState({
        "id": "",
        "name": "",
        "type": ""
    })

    const [ingredientOptions, setIngredientOptions] = useState([])

    useEffect(() => {
        const updatedIngredientOptions = ingredients.map((ingredient) => {
            return <option key={ingredient.id} value={ingredient.id} data-name={ingredient.name} data-type={ingredient.type}>{ingredient.name}</option>
        })
        setIngredientOptions(updatedIngredientOptions)
    }, [ingredients])

    

    function handleSelectedIngredient(event) {
        const selectedOption = event.target.options[event.target.selectedIndex]
        setSelectedIngredient({
            "id": event.target.value,
            "name": selectedOption.getAttribute('data-name'),
            "type": selectedOption.getAttribute('data-type')
        })
    }

    function handleInputChange(event) {
        const {name, value} = event.target
        setSelectedIngredient({...selectedIngredient, [name]: value})
    }

    function handleUpdateIngredient(event) {
        event.preventDefault()
        const updatedData = {
            "name": selectedIngredient.name,
            "type": selectedIngredient.type
        };
        fetch(`/ingredients/${selectedIngredient.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            console.log("Ingredient updated successfully");
            fetchIngredients()
        })
        .catch((error) => {
            console.error("Error updating ingredient:", error);
        });
    }

    return(
        <div className="form-flex">
            <select onChange={handleSelectedIngredient}>
                <option value="" disabled hidden>Select Ingredient</option>
                {ingredientOptions}
            </select>
            <form onSubmit={handleUpdateIngredient} className="form-flex">
                <input className="ingredient-mod-input" onChange={handleInputChange} name="name" type="text" value={selectedIngredient.name}></input>
                <input className="ingredient-mod-input" onChange={handleInputChange} name="type" type="text" value={selectedIngredient.type}></input>
                <button className="change-form" type="submit">Submit Changes</button>
            </form>
        </div>
    )
}

export default ChangeIngredient