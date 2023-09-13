import { Route, Switch, useRouteMatch } from "react-router-dom";
import React from "react";
import Add from "./Add";
import Change from "./Change";

function ModifyPage({fetchDrinks, fetchIngredients}) {

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
                    <Change />
                    <h2>Change Data</h2>
                </Route>
            </Switch>
        </div>
    )
}

export default ModifyPage