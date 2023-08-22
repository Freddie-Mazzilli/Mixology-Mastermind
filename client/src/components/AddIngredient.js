import React from "react";

function AddIngredient({updateIngredientFormData}) {

    return(
        <div className="form-flex">
            <h2>New Ingredient</h2>
            <form className="form-flex">
                <div className="form-flex2">
                    <input className="ingredient-form" onChange={updateIngredientFormData} type="text" name="name" placeholder="Ingredient Name" required/>
                    <button className="form" type="submit">Add Ingredient</button>
                </div>
            </form>
        </div>
    )
}

export default AddIngredient