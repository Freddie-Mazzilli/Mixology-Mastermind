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

    const [drinkIngredients, setDrinkIngredients] = useState(null)

    // const [newIngredients, setNewIngredients] = useState([])

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
        let ingredientsObject = {}
        selectedDrink.ingredients.forEach((ingredient) => {
            let drinkIngredientName = ""
            let drinkIngredientQuantity = ""
            let ingredientEntry = ""
            if (ingredient.includes('of')) {
                drinkIngredientName = ingredient.split(' of ')[1]
                drinkIngredientQuantity = ingredient.split(' of ')[0]
                ingredientEntry = `${drinkIngredientQuantity}; ${drinkIngredientName}`
                ingredientsObject[drinkIngredientName] = ingredientEntry
            } else {
                ingredientEntry = ingredient
                ingredientsObject[ingredientEntry] = ingredientEntry
            }
        })
        // console.log(selectedDrink)
        // console.log(ingredientsObject)
        setDrinkIngredients(selectedDrink.ingredients)
    }

    useEffect(() => {
        console.log(drinkIngredients);
    }, [drinkIngredients]);

    function updateFormFields(event) {
    const index = event.target.getAttribute("index")
        console.log(index)
        let newDrinkIngredients = [...drinkIngredients]
        newDrinkIngredients[index] = event.target.value
        setDrinkIngredients(newDrinkIngredients);
        console.log(newDrinkIngredients)
      }
      
      

    const selectedDrinkIngredients = drinkIngredients.map((drinkIngredient, index) => {
        // console.log(index)
        let drinkIngredientName = ""
        let drinkIngredientQuantity = ""
        if (drinkIngredient.includes('of')) {
            drinkIngredientName = drinkIngredient.split(' of ')[1]
            drinkIngredientQuantity = drinkIngredient.split(' of ')[0]
        } else {
            drinkIngredientName = drinkIngredient
        }
        
        return (
        <div className="change-drink-ingredients" key={index}>
            <input index={index} className="full-width-input" type="text" name="name" placeholder="Ingredient" value={drinkIngredient}  onChange={updateFormFields}></input>
            {/* <p>;</p>  */}
            {/* <input className="drink-form" type="text" name="name" placeholder="Ingredient Name" value={drinkIngredientName} required></input> */}
            <button className="delete-ingredient" type="button" onClick={() => handleDeleteIngredient(index)}>Delete</button>
        </div>
    )})

    function handleDeleteIngredient(index) {
        const updatedIngredients = [...selectedDrink.ingredients]
        updatedIngredients.splice(index, 1)
        setSelectedDrink({...selectedDrink, ingredients: updatedIngredients})
        const updatedDrinkIngredients = {...drinkIngredients}
        const ingredientName = selectedDrink.ingredients[index]
        delete updatedDrinkIngredients[ingredientName]
        setDrinkIngredients(updatedDrinkIngredients)
        console.log(drinkIngredients)
    }

    const newIngredient = 
        <div className="change-drink-ingredients">
            <input className="drink-form" type="text" name="name" placeholder="Ingredient" required></input>
        </div>

function handleAddNewIngredient() {
    const updatedIngredients = [...drinkIngredients, '"Please input new Ingredient"'];
    setDrinkIngredients(updatedIngredients);
  }
  

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
                            <button className="add-ingredient" type="button" onClick={handleAddNewIngredient}>Add New Ingredient</button>
                            <button className="form" type="submit">Add Drink</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangeDrink