import React, { useState } from "react";
import ChangeDrink from "./ChangeDrink";
import ChangeIngredient from "./ChangeIngredient";

function Change({drinks, fetchDrinks, fetchIngredients, ingredients}) {

    const [selectedForm, setSelectedForm] = useState('ingredients')

    return(
        <div className="add-page">
            <div className="add-toggle">
                <select value={selectedForm} onChange={(event) => setSelectedForm(event.target.value)}>
                    <option value='ingredients'>Edit Ingredient</option>
                    <option value='drinks'>Edit Drink</option>
                </select>
            </div>
            {selectedForm === 'ingredients' ? <ChangeIngredient ingredients={ingredients} fetchIngredients={fetchIngredients} /> : <ChangeDrink drinks={drinks} fetchDrinks={fetchDrinks}/>}
        </div>
    )
}

export default Change