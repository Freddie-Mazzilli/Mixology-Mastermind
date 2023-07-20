import React from "react";

function Liquors({drinks, handleFormData}) {

    return(
        <div>
            <select onChange={handleFormData}>
                <option value="">-- Select Liquor --</option>
                <option value="Vodka">Vodka</option>
                <option value="Tequila">Tequila</option>
                <option value="White Rum">White Rum</option>
                <option value="Whiskey">Whiskey</option>
                <option value="Bourbon">Bourbon</option>
                <option value="Gin">Gin</option>
                <option value="Triple Sec">Triple Sec</option>
                <option value="Sweet Vermouth">Sweet Vermouth</option>
                <option value="Rye Whiskey">Rye Whiskey</option>
                <option value="Peach Schnapps">Peach Schnapps</option>
            </select>
        </div>
    )
}

export default Liquors