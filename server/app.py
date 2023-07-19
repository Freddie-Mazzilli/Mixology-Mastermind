#!/usr/bin/env python3

import ipdb

from flask import Flask, make_response, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_bcrypt import Bcrypt

from models import db, User, Drink, Ingredient, DrinkIngredient, UserDrink, UserIngredient
app = Flask(__name__)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///home_bar.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

CORS(app)

api = Api(app)

bcrypt = Bcrypt(app)



# bcrypt.generate_password_hash(password).decode('utf-8')
# bcrypt.check_password_hash(hashed_password, password)

def get_current_user():
    return User.query.where( User.id == session.get("user_id") ).first()

def logged_in():
    return bool( get_current_user() )

# USER SIGNUP #

@app.post('/users')
def create_user():
    json = request.json
    pw_hash = bcrypt.generate_password_hash(json['password']).decode('utf-8')
    new_user = User(username=json['username'], password_hash=pw_hash)
    db.session.add(new_user)
    db.session.commit()
    session['user_id'] = new_user.id
    return new_user.to_dict(), 201



# SESSION LOGIN/LOGOUT#

@app.post('/login')
def login():
    json = request.json
    user = User.query.where(User.username == json["username"]).first()
    if user and bcrypt.check_password_hash(user.password_hash, json['password']):
        session['user_id'] = user.id
        return user.to_dict(), 201
    else:
        return {'message': 'Invalid username or password'}, 401

@app.get('/current_session')
def check_session():
    if logged_in():
        return get_current_user().to_dict(), 200
    else:
        return {}, 401

@app.delete('/logout')
def logout():
    session['user_id'] = None
    return {"message": "Successfully logged out!"}, 204

# ////////////////////////////

# class Users(Resource):

#     def get(self):
#         users = User.query.all()
#         response_body = []
#         for user in users:
#             response_body.append(user.to_dict())
#         return make_response(jsonify(response_body), 200)

# api.add_resource(Users, '/users')


class Drinks(Resource):

    def get(self):
        drinks = Drink.query.all()
        response_body = []
        for drink in drinks:
            response_body.append(drink.to_dict())
        return make_response(jsonify(response_body), 200)

    def post(self):
        try:
            data = request.get_json()
            new_drink = Drink(
                name=data.get('name'),
                image=data.get('image')
            )
            ingredient_list = data.get('ingredients').split(', ')
            for ingredient_entry in ingredient_list:
                ingredient_parts = ingredient_entry.split(' ')
                ingredient_quantity = ingredient_parts[0]
                ingredient_name = ' '.join(ingredient_parts[1:])

                ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
                if not ingredient:
                    ingredient = Ingredient(name=ingredient_name)
                    db.session.add(ingredient)
                drink_ingredient = DrinkIngredient(ingredient=ingredient, quantity=ingredient_quantity)
                new_drink.drink_ingredients.append(drink_ingredient)

            db.session.add(new_drink)
            db.session.commit()

            response_body = new_drink.to_dict()
            return make_response(jsonify(response_body), 200)
        except ValueError:
            response_body = {'errors': ['validation errors']}
            return make_response(jsonify(response_body), 400)

api.add_resource(Drinks, '/drinks')


class Ingredients(Resource):

    def get(self):
        ingredients = Ingredient.query.all()
        response_body = []
        for ingredient in ingredients:
            response_body.append(ingredient.to_dict())
        return make_response(jsonify(response_body), 200)

    def post(self):
        try:
            data = request.get_json()
            new_ingredient = Ingredient(
                name=data.get('name')
            )
            db.session.add(new_ingredient)
            db.session.commit()
            response_body = new_ingredient.to_dict()
            return make_response(jsonify(response_body), 200)
        except ValueError:
            response_body = {'errors': ['validation errors']}
            return make_response(jsonify(response_body), 400)

api.add_resource(Ingredients, '/ingredients')


class DrinkIngredients(Resource):

    def get(self):
        drink_ingredients = DrinkIngredient.query.all()
        response_body = []
        for drink_ingredient in drink_ingredients:
            response_body.append(drink_ingredient.to_dict())
        return make_response(jsonify(response_body), 200)

    def post(self):
        try:
            data = request.get_json()
            new_drink_ingredient = DrinkIngredient(
                quantity=data.get('quantity'),
                drink_id=data.get('drink_id'),
                ingredient_id=data.get('ingredient_id')
            )
            db.session.add(new_drink_ingredient)
            db.session.commit()
            response_body = new_drink_ingredient.to_dict()
            return make_response(jsonify(response_body), 200)
        except ValueError:
            response_body = {'errors': ['validation errors']}
            return make_response(jsonify(response_body), 400)

api.add_resource(DrinkIngredients, '/drink_ingredients')


class UserDrinks(Resource):

    def get(self):
        user_drinks = UserDrink.query.all()
        response_body = []
        for user_drink in user_drinks:
            response_body.append(user_drink.to_dict())
        return make_response(jsonify(response_body), 200)

api.add_resource(UserDrinks, '/user_drinks')


class UserIngredients(Resource):

    def get(self):
        user_ingredients = UserIngredient.query.all()
        response_body = []
        for user_ingredient in user_ingredients:
            response_body.append(user_ingredient.to_dict())
        return make_response(jsonify(response_body), 200)

api.add_resource(UserIngredients, '/user_ingredients')




if __name__ == '__main__':
    app.run(port=5555, debug=True)
