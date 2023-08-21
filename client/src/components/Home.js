import React from "react";

function Home({user}) {

    return(
        <div className="flex-col">
            <h2>Welcome {user.username}</h2>
            <p>This is your home bar! There are severel ways to use this manager.</p>
            <ul>
                <li>Use the "Browse" tab to see a searchable list of all the drinks the manager knows how to make. Click on any of the images for a full list of ingredients and instructions on how to make it for yourself!</li>
                <li>Only drink vodka? Really big tequila fan? Head to the "Liquors" tab to select your favorite and only see drinks that contain that booze!</li>
                <li>Use the "Ingredient Search" tab to tell the manager how your bar is stocked. The manager will then give you a searchable list of all the drinks you can make with things you have on hand! (The images here are also clickable)</li>
                <li>On the instructions page for any of the drinks you'll notice a "Save" button. Click this button to save that drink for easy access to the recipe! You can sign in and visit the "My Drinks" tab to quickly view all your saved drinks without having to search!</li>
                <li>To remove a drink from your saved list, click the "edit" button at the top of the "My Drinks" tab, and then click the "X" on any of the drinks. Don't forget to turn "edit" off when you're done!</li>
            </ul>
        </div>
    )
}

export default Home