import '../App.css';
import React, { useSyncExternalStore } from 'react';
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
import Focus from './Focus'
import MyDrinksWrapper from './MyDrinksWrapper'
import Header from './Header'
import Footer from './Footer';
import ModifyPage from './ModifyPage';
import CmsNav from './CmsNav';

function App() {

  let loginError = <p></p>

  const history = useHistory()

  const [ingredients, setIngredients] = useState([])
  const [userIngredients, setUserIngredients] = useState([])
  const [userDrinks, setUserDrinks] = useState([])
  const [myBarDrinks, setMyBarDrinks] = useState([])
  const [savedDrinks, setSavedDrinks] = useState([])

  const [searchText, setSearchText] = useState('')

  const [drinks, setDrinks] = useState([])

  function fetchDrinks() {
    fetch('/drinks')
    .then(res => res.json())
    .then(drinksData => setDrinks(drinksData))
  }

  useEffect(() => {
    fetchDrinks()
  }, [])

  function fetchIngredients() {
    fetch('/ingredients')
    .then(res => res.json())
    .then(ingredientsData => setIngredients(ingredientsData))
  }

  useEffect(() => {
    fetchIngredients()
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
    fetch(`/user_ingredients/${currentUser.id}`)
    .then(res => res.json())
    .then(ingredientsData => setUserIngredients(ingredientsData))}
  }, [currentUser])
  const [loginToggle, setLoginToggle] = useState(true)

  useEffect(() => {
    if(currentUser){
    fetch(`/user_drinks/${currentUser.id}`)
    .then(res => res.json())
    .then(savedDrinksData => setSavedDrinks(savedDrinksData))}
  }, [userDrinks, currentUser])

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
        setUserIngredients([...userIngredients, newUserIngredient]);
        // console.log(userIngredients);
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

  function addMyDrinks(event) {
    const new_user_drink = {
      "user_id": currentUser.id,
      "drink_id": event.target.id
    };
    console.log(new_user_drink);
    fetch('/user_drinks', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(new_user_drink)
    })
      .then(res => res.json())
      .then(newUserDrink => {
        setUserDrinks([...userDrinks, newUserDrink]);
        console.log(userDrinks);
      });
  }

  function deleteMyDrinks(event) {
      const drink_id = event.target.id
      console.log(drink_id)
      fetch(`/user_drinks/${drink_id}`, {
          method: "DELETE"
      })
      .then(res => {
          if(res.ok) {
              setUserDrinks(userDrinks.filter(userDrink => {
                  return userDrink.id != drink_id
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

  useEffect(() => {
    if (myBarDrinks) {
      setMyBarDrinks([]);
      const userIngredientsList = userIngredients.map(ingredient => ingredient.ingredient.name);
      for (const drink of drinks) {
        let ingredientsList = drink.ingredients.map(ingredient => {
          const index = ingredient.split(' of ').length;
          return ingredient.split(' of ')[index - 1];
        });
        let canMake = ingredientsList.every(ingredient => userIngredientsList.includes(ingredient));
        if (canMake === true) {
          setMyBarDrinks(prevDrinks => [...prevDrinks, drink]);
        }
      }
    }
  }, [userIngredients, drinks]);

  const [focusDrink, setFocusDrink] = useState()

  function focusSelector(event) {
    setFocusDrink(event.target.alt)
    history.push('/focus')
  }

  return (
    <div className="App">
      <div className='content'>
      <Header />
      <Switch>
        <Route exact path='/'>
          <div className='landing-div'>
            <button className='login-toggle' onClick={loginToggleHandler}>{loginToggle ? "Login" : "Signup"}</button>
            {loginSignupManager()}
            {loginError}
          </div>
        </Route>
        <Route exact path='/home'>
          <Nav logout={logout} />
          {homeManager()}
        </Route>
        <Route exact path='/browse'>
          <Nav logout={logout} />
          <Search setSearchText={setSearchText} />
          <BrowseWrapper drinks={filteredDrinks} focusSelector={focusSelector} />
        </Route>
        {/* <Route exact path='/liquors'>
          <Nav logout={logout} />
          <Liquors drinks={drinks} handleFormData={handleFormData}/>
          <BrowseWrapper drinks={liquorDrinks} focusSelector={focusSelector} />
        </Route> */}
        <Route exact path='/ingredient_search'>
          <Nav logout={logout} />
          <IngredientManager addMyIngredients={addMyIngredients} deleteMyIngredients={deleteMyIngredients} currentUser={currentUser} ingredients={ingredients} userIngredients={userIngredients} setUserIngredients={setUserIngredients} />
          <MyBar user={currentUser}  myBarDrinks={myBarDrinks} focusSelector={focusSelector}/>
        </Route>
        <Route exact path='/my_drinks'>
          <Nav logout={logout} />
          <MyDrinksWrapper deleteMyDrinks={deleteMyDrinks} focusSelector={focusSelector} drinks={savedDrinks} />
        </Route>
        <Route exact path='/focus'>
          <Nav logout={logout} />
          <Focus addMyDrinks={addMyDrinks} focusDrink={focusDrink} />
        </Route>
        <Route path='/modify'>
          <Nav />
          <CmsNav />
          <ModifyPage fetchDrinks={fetchDrinks} fetchIngredients={fetchIngredients}/>
        </Route>
      </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
