import React, {useEffect, useState} from "react";
import Focus from "./Focus";

function Home({user, drinks}) {

    const [randomDrinkId, setRandomDrinkId] = useState(null);

    useEffect(() => {
        if (drinks && drinks.length > 0) {
            const randomIndex = Math.floor(Math.random() * drinks.length);
            setRandomDrinkId(drinks[randomIndex].id); // Assuming each drink has an 'id' field
        }
    }, [drinks]);

    return(
        <div className="flex-col">
            <h2>Welcome {user.username}!</h2>
            <p>Have you ever tried this drink?</p>
            <Focus focusDrink={randomDrinkId} />
        </div>
    )
}

export default Home