import React from "react";

function AddDrink({updateDrinkFormData}) {

    return(
        <div className="form-flex">
          <h2>New Drink</h2>
          <form className="form-flex">
            <div className="form-flex2">
                <input className="drink-form" onChange={updateDrinkFormData} type="text" name="name" placeholder="Drink Name" required/>
                <input className="drink-form" onChange={updateDrinkFormData} type="text" name="image" placeholder="Image URL" required/>
                <input className="drink-form" onChange={updateDrinkFormData} type="text" name="instructions" placeholder="Instructions" required/>
                <p>Follow this format and input all ingredients in the same line:</p>
                <p>"Quantity"; "Ingredient Name", "Quantity"; "Ingredient Name"...</p>
                <textarea className="drink-form-ingredients" onChange={updateDrinkFormData} type="text" name="ingredients" placeholder="Ingredients" required/>
            </div>
            <div className="form-flex2">
                <button className="form" type="submit">Add Drink</button>
            </div>
          </form>
        </div>
    )
}

export default AddDrink