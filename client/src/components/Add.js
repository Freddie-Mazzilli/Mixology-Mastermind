import React, { useState } from "react";
import AddDrink from "./AddDrink";
import AddIngredient from "./AddIngredient";

function Add({fetchDrinks, fetchIngredients}) {

    const [selectedForm, setSelectedForm] = useState('ingredients')

    return(
        <div className="add-page">
            <div className="add-toggle">
                <select value={selectedForm} onChange={(event) => setSelectedForm(event.target.value)}>
                    <option value='ingredients'>Add Ingredient</option>
                    <option value='drinks'>Add Drink</option>
                </select>
            </div>
            {selectedForm === 'ingredients' ? <AddIngredient fetchIngredients={fetchIngredients} /> : <AddDrink fetchDrinks={fetchDrinks} />}
        </div>
    )
}

export default Add