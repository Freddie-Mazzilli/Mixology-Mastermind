import React, {useState} from "react";

function AddIngredient({fetchIngredients}) {

    const [ingredientFormData, setIngredientFormData] = useState({
        "name": ""
      })
    
    function updateIngredientFormData(event){
        setIngredientFormData({...ingredientFormData, [event.target.name]: event.target.value})
        // console.log(ingredientFormData)
    }
    
    async function addIngredient(event) {
        event.preventDefault();
        try {
          const response = await fetch('/ingredients', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredientFormData),
          });
      
          if (response.ok) {
            const data = await response.json();
            if (data.errors.length > 0) {
              console.error('Errors:', data.errors);
            }
            if (data.success.length > 0) {
              console.log('Successfully added ingredients:', data.success);
              await fetchIngredients();
            }
          } else {
            console.error('HTTP Error:', response.statusText);
          }
      
          setIngredientFormData({ "name": "" });
        } catch (error) {
          console.error('Error:', error);
        }
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
                    <input className="full-width-input" onChange={updateIngredientFormData} value={ingredientFormData.name} type="text" name="name" placeholder="Ingredient Type; Ingredient Name" required/>
                    <button className="form" type="submit">Add Ingredient</button>
                </div>
            </form>
        </div>
    )
}

export default AddIngredient