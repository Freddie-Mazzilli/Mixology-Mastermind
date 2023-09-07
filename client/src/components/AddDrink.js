import React, {useState} from "react";
import NewDrink from "./NewDrink";

function AddDrink({fetchDrinks}) {

    const [drinkFormData, setDrinkFormData] = useState({
        "name": "",
        "image": "",
        "ingredients": "",
        "instructions": ""
    })
    
    function updateDrinkFormData(event){
        setDrinkFormData({...drinkFormData, [event.target.name]: event.target.value})
        console.log(drinkFormData)
    }

    async function addDrink(event) {
        event.preventDefault();
    
        try {
            const response = await fetch('/drinks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(drinkFormData),
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data.errors.length > 0) {
                    console.error('Errors:', data.errors);
                }
                if (data.success.length > 0) {
                    console.log('Successfully added drinks:', data.success);
                    await fetchDrinks();
                }
            } else if (response.status === 400) {
                const data = await response.json();
                console.error(data.errors[0]);
            } else {
                console.error('HTTP Error:', response.statusText);
            }
    
            setDrinkFormData({
                "name": "",
                "image": "",
                "ingredients": "",
                "instructions": ""
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
    

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            addDrink(event)
        }
    }
      

    return(
        <div className="add-drink-container">
            <div className="form-flex">
                <h2>New Drink</h2>
                <form onKeyDown={handleKeyPress} onSubmit={addDrink} className="form-flex">
                    <div className="form-flex2">
                        <input className="drink-form" onChange={updateDrinkFormData} type="text" name="name" value={drinkFormData.name} placeholder="Drink Name" required/>
                        <input className="drink-form" onChange={updateDrinkFormData} type="text" name="image" value={drinkFormData.image} placeholder="Image URL" required/>
                        <textarea className="drink-form-ingredients" onChange={updateDrinkFormData} type="text" name="instructions" value={drinkFormData.instructions} placeholder="Instructions" required/>
                        <p>Follow this format and input all ingredients in the same line:</p>
                        <p>"Quantity"; "Ingredient Name", "Quantity"; "Ingredient Name"...</p>
                        <textarea className="drink-form-ingredients" onChange={updateDrinkFormData} type="text" name="ingredients" value={drinkFormData.ingredients} placeholder="Ingredients" required/>
                    </div>
                    <div className="form-flex2">
                        <button className="form" type="submit">Add Drink</button>
                    </div>
                </form>
            </div>
            <NewDrink selectedDrink={drinkFormData}/>
        </div>
    )
}

export default AddDrink