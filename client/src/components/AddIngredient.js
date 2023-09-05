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
        fetch('/ingredients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredientFormData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors.length > 0) {
                console.error('Errors:', data.errors)
            }
            if (data.success.length > 0) {
                console.log('Successfully added ingredients:', data.success)
            }
        })
        .catch(error => {
            console.error('Error:', error)
        })
        setIngredientFormData({"name": ""})
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            addIngredient(event)
        }
    }
      

    return(
        <div className="form-flex">
            <h2>New Ingredients</h2>
            <form onKeyDown={handleKeyPress} className="form-flex" onSubmit={addIngredient}>
                <div className="form-flex">
                    <textarea className="drink-form-ingredients" onChange={updateIngredientFormData} value={ingredientFormData.name} type="text" name="name" placeholder="Ingredient Name(s) (comma separated)" required/>
                    <button className="form" type="submit">Add Ingredient</button>
                </div>
            </form>
        </div>
    )
}

export default AddIngredient