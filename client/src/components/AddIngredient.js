import React, {useState} from "react";

function AddIngredient({}) {

    const [ingredientFormData, setIngredientFormData] = useState({
        "name": ""
      })
    
    function updateIngredientFormData(event){
        setIngredientFormData({...ingredientFormData, [event.target.name]: event.target.value})
        console.log(ingredientFormData)
    }
    
    function addIngredient(event) {
        event.preventDefault()
        console.log('Form Data Submitted:', ingredientFormData)
        setIngredientFormData({"name": ""})
        console.log('Form Data Cleared:', ingredientFormData)
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            addIngredient(event)
        }
    }
      

    return(
        <div className="form-flex">
            <h2>New Ingredient</h2>
            <form onKeyDown={handleKeyPress} className="form-flex" onSubmit={addIngredient}>
                <div className="form-flex2">
                    <input onChange={updateIngredientFormData} value={ingredientFormData.name} type="text" name="name" placeholder="Ingredient Name" required/>
                    <button className="form" type="submit">Add Ingredient</button>
                </div>
            </form>
        </div>
    )
}

export default AddIngredient