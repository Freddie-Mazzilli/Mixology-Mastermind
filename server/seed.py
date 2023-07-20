#!/usr/bin/env python3

# Local imports
from app import app
from models import db, User, Drink, Ingredient, DrinkIngredient, UserDrink, UserIngredient

with app.app_context():


    # Drink.query.delete()
    # Ingredient.query.delete()
    # DrinkIngredient.query.delete()
    # User.query.delete()
    UserIngredient.query.delete()


    # drinks = []
    # drinks.append(Drink(name="", image="", ingredients=""))
    # drinks.append(Drink(name="Margarita", image="https://kitchenswagger.com/wp-content/uploads/2023/02/classic-margarita-1.jpg", ingredients="2oz; Tequila, 1oz; Lime Juice, 1oz; Triple Sec"))
    # drinks.append(Drink(name="Old Fashioned", image="https://assets.epicurious.com/photos/5e41a6d175661800087cc87c/1:1/w_2940,h_2940,c_limit/OldFashioned_HERO_020520_619.jpg", ingredients="2oz Bourbon, 1 Sugar Cube, 2 Dashes Angostura Bitters, Orange Peel"))
    # drinks.append(Drink(name="Martini", image="https://images.food52.com/3JhJhfVb-tzoQSM6EgBU0q6i8wA=/1200x1200/c81a3734-2f0c-4c75-b057-544f2a690f04--2021-0603_martini_3x2_julia-gartland_316.jpg", ingredients="2.5oz Gin, 0.5oz Dry Vermouth, Olive or Lemon Twist for garnish"))
    # drinks.append(Drink(name="Mojito", image="https://mixthatdrink.com/wp-content/uploads/2009/03/mojito-735x1104.jpg", ingredients="2oz White Rum, 1oz Lime Juice, 2 teaspoons Sugar, Fresh Mint Leaves, Soda Water"))
    # drinks.append(Drink(name="Cosmopolitan", image="https://assets-prd.punchdrink.com/wp-content/uploads/2020/03/13102145/Article-Ultimate-Cosmo-Cosmopolitan-Cocktail-Recipe.jpg", ingredients="1.5oz Vodka, 1oz Cranberry Juice, 0.5oz Lime Juice, 0.5oz Triple Sec"))
    # drinks.append(Drink(name="Moscow Mule", image="https://bakeitwithlove.com/wp-content/uploads/2022/07/Moscow-Mule-sq.jpg", ingredients="2oz Vodka, 0.5oz Lime Juice, 4-6oz Ginger Beer, Lime Wedge for garnish"))
    # drinks.append(Drink(name="Negroni", image="https://www.theendlessmeal.com/wp-content/uploads/2021/12/Mezcal-Negroni-5.jpg", ingredients="1oz Gin, 1oz Campari, 1oz Sweet Vermouth, Orange Twist for garnish"))
    # drinks.append(Drink(name="Pina Colada", image="https://www.kerryfoodservice.com/cdn/shop/products/swzjjrcehfuoah8kn4hz_1000x.jpg?v=1615853893", ingredients="2oz White Rum, 4oz Pineapple Juice, 2oz Coconut Cream, Pineapple Wedge and Cherry for garnish"))
    # drinks.append(Drink(name="Whiskey Sour", image="https://assets.bonappetit.com/photos/57acc14e53e63daf11a4d9b6/1:1/w_2560%2Cc_limit/whiskey-sour.jpg", ingredients="2oz Whiskey, 0.75oz Lemon Juice, 0.75oz Simple Syrup, Cherry and Orange Slice for garnish"))
    # drinks.append(Drink(name="Bloody Mary", image="https://www.bhg.com/thmb/hOi3y8hR80GXSg7O6iZ34ykU2Kc=/1244x0/filters:no_upscale():strip_icc()/bloody-mary-mix-RU272432-844ec68c28e5457c8f26c1edbcf7f20f.jpg", ingredients="1.5oz Vodka, 4oz Tomato Juice, 0.5oz Lemon Juice, Worcestershire Sauce, Hot Sauce, Celery Salt, Black Pepper, Celery Stalk and Lemon Wedge for garnish"))


    # ingredients = []

    # drink_ingredients = []


    # db.session.add_all(drinks)
    # db.session.add_all(ingredients)
    # db.session.add_all(drink_ingredients)
    db.session.commit()
    print("🌱 Successfully seeded! 🌱")