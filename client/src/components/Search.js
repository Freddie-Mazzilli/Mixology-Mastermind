import React from "react";

function Search({setSearchText}) {

    return(
        <div className="search">
            <label htmlFor="search">Search Drinks:</label>
            <input
                className="form"
                type="text"
                id="search"
                placeholder="Search Drinks..."
                onChange={(event) => {
                    setSearchText(event.target.value)
                }}
            />

        </div>
    )
}

export default Search