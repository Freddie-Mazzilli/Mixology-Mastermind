import { Route, Switch, useRouteMatch } from "react-router-dom";
import React from "react";
import Add from "./Add";
import Change from "./Change";

function ModifyPage({drinks, fetchDrinks, fetchIngredients, ingredients}) {

    const match = useRouteMatch()

    return(
        <div>
            <Switch>
                <Route exact path={`${match.url}`}>
                    <h2>Select "Modify" or "Add" Data</h2>
                </Route>
                <Route exact path={`${match.url}/add`}>
                    <Add fetchDrinks={fetchDrinks} fetchIngredients={fetchIngredients}/>
                </Route>
                <Route exact path={`${match.url}/change`}>
                    <Change ingredients={ingredients} fetchIngredients={fetchIngredients} drinks={drinks} fetchDrinks={fetchDrinks}/>
                </Route>
            </Switch>
        </div>
    )
}

export default ModifyPage