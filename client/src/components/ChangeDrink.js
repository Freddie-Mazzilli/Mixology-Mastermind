import React, { useState, useEffect } from "react";

function ChangeDrink({drinks, fetchDrinks}) {

    const [selectedDrink, setSelectedDrink] = useState({
        "id": "",
        "name": "",
        "image": "",
        "instructions": "",
        "ingredients": []
    })

    const [drinkOptions, setDrinkOptions] = useState([])

    useEffect(() => {
        const updatedDrinkOptions = drinks.map((drink) => {
            return <option key={drink.id} value={drink.id} data-name={drink.name} data-image={drink.image} data-instructions={drink.instructions} data-ingredients={drink.ingredients}>{drink.name}</option>
        })
        setDrinkOptions(updatedDrinkOptions)
    }, [drinks])

    return(
        <div className="modify-drink-container">
            <div className="add-drink-container">
                <div className="form-flex">
                    <select value={selectedDrink.id}>
                        <option value="" disabled hidden>Select Drink</option>
                        {drinkOptions}
                    </select>
                    <h2>Selected Drink</h2>
                    <form className="form-flex">
                        <div className="form-flex2">
                            <input className="drink-form" type="text" name="name" value="" placeholder="Drink Name" required/>
                            <input className="drink-form" type="text" name="image" value="" placeholder="Image URL" required/>
                            <textarea className="drink-form-ingredients" type="text" name="instructions" value="" placeholder="Instructions" required/>
                            <textarea className="drink-form-ingredients" type="text" name="ingredients" value="" placeholder="Ingredients" required/>
                        </div>
                        <div className="form-flex2">
                            <button className="form" type="submit">Add Drink</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangeDrink