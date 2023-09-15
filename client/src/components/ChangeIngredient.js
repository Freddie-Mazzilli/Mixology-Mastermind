import React, { useState, useEffect } from "react";

function ChangeIngredient({ingredients}) {

    const [selectedIngredient, setSelectedIngredient] = useState({
        "id": "",
        "name": "",
        "type": ""
    })

    const ingredient = ingredients.map((ingredient) => {
        return <option key={ingredient.id} value={ingredient.id} data-name={ingredient.name} data-type={ingredient.type}>{ingredient.name}</option>
    })

    function handleSelectedIngredient(event) {
        const selectedOption = event.target.options[event.target.selectedIndex]
        setSelectedIngredient({
            "id": event.target.value,
            "name": selectedOption.getAttribute('data-name'),
            "type": selectedOption.getAttribute('data-type')
        })
    }
    
    useEffect(() => {
        console.log(selectedIngredient);
    }, [selectedIngredient]);

    return(
        <div className="form-flex">
            <select onChange={handleSelectedIngredient}>
                {ingredient}
            </select>
            <form className="form-flex">
                <input className="ingredient-mod-input" name="name" type="text" value={selectedIngredient.name}></input>
                <input className="ingredient-mod-input" name="type" type="text" value={selectedIngredient.type}></input>
            </form>
        </div>
    )
}

export default ChangeIngredient