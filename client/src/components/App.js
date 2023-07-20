import '../App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from "react-router-dom"

import Login from './Login';
import Signup from './Signup';
import Nav from './Nav';
import Home from './Home';
import BrowseWrapper from './BrowseWrapper';
import Search from './Search';
import Liquors from './Liquors';
import IngredientManager from './IngredientManager';
import MyBar from './MyBar';

function App() {

  let loginError = <p></p>

  const history = useHistory()

  const [drinks, setDrinks] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [userIngredients, setUserIngredients] = useState([])
  const [userDrinks, setUserDrinks] = useState([])

  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    fetch('/drinks')
    .then(res => res.json())
    .then(drinksData => setDrinks(drinksData))
  }, [])

  useEffect(() => {
    fetch('/ingredients')
    .then(res => res.json())
    .then(ingredientsData => setIngredients(ingredientsData))
  }, [])

  useEffect(() => {
    fetch('/user_drinks')
    .then(res => res.json())
    .then(drinksData => setUserDrinks(drinksData))
  }, [])

  const [currentUser, setCurrentUser] = useState(null) 
  
  useEffect(() => {
    fetch('/current_session')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(user => setCurrentUser(user))
      }
    })
  }, [])

  function attemptLogin(userInfo) {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(res => {
      if (res.ok) {
        res.json()
        .then(user => {
          setCurrentUser(user)
          console.log(user)
          goHome()
        })
      }
    })
  }

  function attemptSignup(userInfo) {
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then(res => {
      if (res.ok) {
        res.json()
        .then(user => {
          setCurrentUser(user)
          goHome()
        })
      }
    })
  }

  function logout() {
    setCurrentUser(null)
    fetch('/logout', { method: 'DELETE' })
    console.log('logged out')
  }

  useEffect(() => {
    if(currentUser){
    fetch(`http://127.0.0.1:5555/user_ingredients/${currentUser.id}`)
    .then(res => res.json())
    .then(ingredientsData => setUserIngredients(ingredientsData))}
  }, [currentUser])
  const [loginToggle, setLoginToggle] = useState(true)

  function loginToggleHandler() {
    setLoginToggle(!loginToggle)
  }

  function loginSignupManager() {
    if(loginToggle === true) {
      return <Login attemptLogin={attemptLogin} goHome={goHome} />
    }
    else {
      return <Signup attemptSignup={attemptSignup} goHome={goHome}/>
    }
  }

  const filteredDrinks = drinks.filter(drink => {
    if(searchText === "") {
      return true
    }
    return drink.name.toUpperCase().includes(searchText.toUpperCase())
  })

  function goHome() {
    history.push('/home')
  }

  const [formData, setFormData] = useState('')

  function handleFormData(event) {
    setFormData(event.target.value)
    console.log(formData)
  }

  const liquorDrinks = drinks.filter(drink => {
    if(formData === "") {
      return true
    }
    const ingredients_string = String(drink.ingredients)
    if(ingredients_string.includes(formData)) {
      return true
    }
    return false
  })

  function addMyIngredients(event) {
    const new_user_ingredient = {
      "user_id": currentUser.id,
      "ingredient_id": event.target.id
    };
    console.log(new_user_ingredient);
    fetch('/user_ingredients', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(new_user_ingredient)
    })
      .then(res => res.json())
      .then(newUserIngredient => {
        // Update the state with the fetched data
        setUserIngredients([...userIngredients, newUserIngredient]);
        console.log(userIngredients);
      });
  }

  function deleteMyIngredients(event) {
      const ingredient_id = event.target.id
      console.log(ingredient_id)
      fetch(`/user_ingredients/${ingredient_id}`, {
          method: "DELETE"
      })
      .then(res => {
          if(res.ok) {
              setUserIngredients(userIngredients.filter(userIngredient => {
                  return userIngredient.id != ingredient_id
              }))
          }
      })
  }

  function homeManager(){
    if(!currentUser){
      return(
          <h1>Loading...</h1>
      )
    }
    return <Home user={currentUser} />
  }

  

  return (
    <div className="App">
      <h1>Home Bar Manager</h1>
      <Nav logout={logout} />
      <Switch>
        <Route exact path='/'>
          <div>
            <button onClick={loginToggleHandler}>{loginToggle ? "Login" : "Signup"}</button>
            {loginSignupManager()}
            {loginError}
          </div>
        </Route>
        <Route exact path='/home'>
          {homeManager()}
        </Route>
        <Route exact path='/browse'>
          <Search setSearchText={setSearchText} />
          <BrowseWrapper drinks={filteredDrinks} />
        </Route>
        <Route exact path='/liquors'>
          <Liquors drinks={drinks} handleFormData={handleFormData}/>
          <BrowseWrapper drinks={liquorDrinks} />
        </Route>
        <Route exact path='/my_bar'>
          <IngredientManager addMyIngredients={addMyIngredients} deleteMyIngredients={deleteMyIngredients} currentUser={currentUser} ingredients={ingredients} userIngredients={userIngredients} setUserIngredients={setUserIngredients} />
          <MyBar user={currentUser} userIngredients={userIngredients} drinks={drinks} />
        </Route>
        <Route exact path='/my_drinks'></Route>
      </Switch>
    </div>
  );
}

export default App;
