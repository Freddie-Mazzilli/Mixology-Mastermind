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
        .then(response => {
            if (response.ok) {
                return response.json()
            } else if (response.status === 400) {
                return response.json().then(data => {
                    console.error(data.errors[0])
                })
            }
        })
        .catch(error => {
            console.error('Error:', error)
        })
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