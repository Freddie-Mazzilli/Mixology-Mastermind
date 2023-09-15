import React, { useState } from "react";

function ChangeDrink({drinks, fetchDrinks}) {

    const [selectedDrink, setSelectedDrink] = useState({
        "id": "",
        "name": "",
        "image": "",
        "instructions": "",
        "ingredients": []
    })

    return(
        <div className="modify-drink-container">
            <div className="add-drink-container">
                <div className="form-flex">
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