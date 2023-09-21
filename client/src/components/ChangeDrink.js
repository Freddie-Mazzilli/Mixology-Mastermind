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

    function handleSelectedDrink(event) {
        const selectedOption = event.target.options[event.target.selectedIndex]
        const ingredientsString = selectedOption.getAttribute('data-ingredients')
        const ingredientsList = ingredientsString.split(',')
        setSelectedDrink({
            "id": event.target.value,
            "name": selectedOption.getAttribute('data-name'),
            "image": selectedOption.getAttribute('data-image'),
            "instructions": selectedOption.getAttribute('data-instructions'),
            "ingredients": ingredientsList
        })
        console.log(selectedDrink)
    }

    const selectedDrinkIngredients = selectedDrink.ingredients.map((drinkIngredient) => {
        console.log(drinkIngredient)
        let drinkIngredientName = ""
        let drinkIngredientQuantity = ""
        if (drinkIngredient.includes('of')) {
            drinkIngredientName = drinkIngredient.split(' of ')[1]
            drinkIngredientQuantity = drinkIngredient.split(' of ')[0]
        } else {
            drinkIngredientName = drinkIngredient
        }
        
        return (
        <div className="change-drink-ingredients">
            <input className="drink-form" type="text" name="name" placeholder="Quantity" value={drinkIngredientQuantity}></input><p>;</p> <input className="drink-form" type="text" name="name" placeholder="Ingredient Name" value={drinkIngredientName} required></input>
        </div>
    )})

    const newIngredient = 
        <div className="change-drink-ingredients">
            <input className="drink-form" type="text" name="name" placeholder="Quantity"></input><p>;</p> <input className="drink-form" type="text" name="name" placeholder="Ingredient Name" required></input>
        </div>

    return(
        <div className="modify-drink-container">
            <div className="add-drink-container">
                <div className="form-flex">
                    <select value={selectedDrink.id} onChange={handleSelectedDrink}>
                        <option value="" disabled hidden>Select Drink</option>
                        {drinkOptions}
                    </select>
                    <h2>Selected Drink</h2>
                    <form className="form-flex">
                        <div className="form-flex2">
                            <input className="drink-form" type="text" name="name" value={selectedDrink.name} placeholder="Drink Name" required/>
                            <textarea className="drink-form-ingredients" type="text" name="image" value={selectedDrink.image} placeholder="Image URL" required/>
                            <textarea className="drink-form-ingredients" type="text" name="instructions" value={selectedDrink.instructions} placeholder="Instructions" required/>
                            {selectedDrinkIngredients}
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