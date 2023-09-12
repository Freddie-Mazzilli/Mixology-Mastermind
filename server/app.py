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
    # ipdb.set_trace()
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
            ingredient_list = []
            drink_dict = drink.to_dict()
            for ingredient in drink.drink_ingredients:
                if ingredient.quantity:
                    ingredient_list.append(f'{ingredient.quantity} of {ingredient.ingredient.name}')
                else:
                    ingredient_list.append(f'{ingredient.ingredient.name}')
                drink_dict.update({
                    "ingredients": ingredient_list
                })
            response_body.append(drink_dict)
        return make_response(jsonify(response_body), 200)

    def post(self):
        try:
            data = request.get_json()

            response_body = {'success': [], 'errors': []}

            drink_name = data.get('name')

            existing_drink = Drink.query.filter_by(name=drink_name).first()
            if existing_drink:
                response_body['errors'].append(f'{drink_name} is already in the database')
                return make_response(jsonify(response_body), 400)

            ingredient_list = data.get('ingredients').split(', ')
            missing_ingredients = []
            for ingredient_entry in ingredient_list:
                if ';' in ingredient_entry:
                    ingredient_parts = ingredient_entry.split('; ')
                    ingredient_name = ingredient_parts[1]
                else:
                    ingredient_name = ingredient_entry
                
                ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
                if not ingredient:
                    missing_ingredients.append(ingredient_name)
            if missing_ingredients:
                error_message = f"Ingredients not in database: {', '.join(missing_ingredients)}"
                response_body['errors'].append(error_message)
                return make_response(jsonify(response_body), 400)

            if not missing_ingredients:
                new_drink = Drink(
                    name=data.get('name'),
                    image=data.get('image'),
                    instructions=data.get('instructions')
                )
                db.session.add(new_drink)
                
                for ingredient_entry in ingredient_list:
                    if ';' in ingredient_entry:
                        ingredient_parts = ingredient_entry.split('; ')
                        ingredient_quantity = ingredient_parts[0]
                        ingredient_name = ingredient_parts[1]
                        ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
                    else:
                        ingredient_quantity = False
                        ingredient_name = ingredient_entry
                        ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
                    
                    if ingredient_quantity:
                        drink_ingredient = DrinkIngredient(ingredient=ingredient, quantity=ingredient_quantity)
                    else:
                        drink_ingredient = DrinkIngredient(ingredient=ingredient)
                    db.session.add(drink_ingredient)
                    new_drink.drink_ingredients.append(drink_ingredient)

                db.session.commit()

                response_body['success'].append(new_drink.to_dict())
                return make_response(jsonify(response_body), 200)
        except ValueError:
            response_body['errors'].append('validation errors')
            return make_response(jsonify(response_body), 400)

api.add_resource(Drinks, '/drinks')


class DrinksById(Resource):

    def get(self, id):
        drink = Drink.query.filter(Drink.id == id).first()
        ingredient_list = []
        for ingredient in drink.drink_ingredients:
            if ingredient.quantity:
                ingredient_list.append(f'{ingredient.quantity} of {ingredient.ingredient.name}')
            else:
                ingredient_list.append(f'{ingredient.ingredient.name}')
        response_body = drink.to_dict()
        response_body.update({
            "ingredients": ingredient_list
        })
        return make_response(jsonify(response_body), 200)

    def patch(self, id):
        drink = Drink.query.filter(Drink.id == id).first()
        if not drink:
            response_body = {'error': 'Drink not found'}
            return make_response(jsonify(response_body), 404)
        try:
            data = request.get_json()
            for key in data:
                setattr(drink, key, data.get(key))
            db.session.commit()
            return make_response(jsonify(drink.to_dict()), 202)
        except ValueError:
            response_body = {'errors': ['Validation Errors']}
            return make_response(jsonify(response_body), 500)

    def delete(self, id):
        drink = Drink.query.filter(Drink.id == id).first()
        db.session.delete(drink)
        db.session.commit()
        response_body = {}
        return make_response(jsonify(response_body), 204)

api.add_resource(DrinksById, '/drinks/<int:id>')


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
            ingredient_list = data.get('name').split(', ')
            response_body = {'success': [], 'errors': []}

            for ingredient in ingredient_list:
                ingredient_parts = ingredient.split('; ')
                if len(ingredient_parts) != 2:
                    response_body['errors'].append(f'{ingredient} entry is incomplete')
                    continue

                ingredient_name, ingredient_type = ingredient_parts

                existing_ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
                if existing_ingredient:
                    response_body['errors'].append(f'{ingredient_name} is already in the database')
                    continue

                try:
                    new_ingredient = Ingredient(
                        name=ingredient_name,
                        type=ingredient_type
                    )
                    db.session.add(new_ingredient)
                    db.session.commit()
                    response_body['success'].append(new_ingredient.to_dict())

                except ValueError as error:
                    response_body['errors'].append(f'Ingredient {ingredient_name}: {str(error)}')

            return make_response(jsonify(response_body), 200)

        except Exception as e:
            response_body = {'errors': ['An error occured while processing your request']}
            return make_response(jsonify(response_body), 500)

api.add_resource(Ingredients, '/ingredients')


class IngredientsById(Resource):

    def patch(self, id):
        ingredient = Ingredient.query.filter(Ingredient.id == id).first()
        if not ingredient:
            return make_response({'error': 'Ingredient not found'}, 404)
        data=request.get_json()
        for key in data:
            setattr(ingredient, key, data.get(key))
        db.session.commit()
        response_body = ingredient.to_dict()
        return make_response(jsonify(response_body), 200)

    def delete(self, id):
        ingredient = Ingredient.query.filter(Ingredient.id == id).first()
        db.session.delete(ingredient)
        db.session.commit()
        response_body = {}
        return make_response(jsonify(response_body), 204)

api.add_resource(IngredientsById, '/ingredients/<int:id>')


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


class DrinkIngredientsById(Resource):

    def patch(self, id):
        drink_ingredient = DrinkIngredient.query.filter(DrinkIngredient.id == id).first()
        if not drink_ingredient:
            return make_response({'error': 'Drink ingredient not found'}, 404)
        data=request.get_json()
        for key in data:
            setattr(drink_ingredient, key, data.get(key))
        db.session.commit()
        response_body = drink_ingredient.to_dict()
        return make_response(jsonify(response_body), 200)

api.add_resource(DrinkIngredientsById, '/drink_ingredients/<int:id>')


class UserDrinks(Resource):

    def get(self):
        user_drinks = UserDrink.query.all()
        response_body = []
        for user_drink in user_drinks:
            response_body.append(user_drink.to_dict())
        return make_response(jsonify(response_body), 200)

    def post(self):
        try:
            data=request.get_json()
            new_user_drink = UserDrink(
                user_id=data.get('user_id'),
                drink_id=data.get('drink_id')
            )
            db.session.add(new_user_drink)
            db.session.commit()
            response_body = new_user_drink.to_dict()
            return make_response(jsonify(response_body), 200)
        except ValueError:
            response_body = {'errors': ['validation errors']}
            return make_response(jsonify(response_body), 400)

api.add_resource(UserDrinks, '/user_drinks')


class UserDrinksById(Resource):

    def get(self, id):
        user_drinks = UserDrink.query.filter(UserDrink.user_id == id)
        response_body = []
        for user_drink in user_drinks:
            # ipdb.set_trace()
            response_body.append(user_drink.to_dict())
        return make_response(jsonify(response_body), 200)

    def delete(self, id):
        user_drink = UserDrink.query.filter(UserDrink.drink_id == id).first()
        if not user_drink:
            return make_response({'error': 'User Drink not found'}, 404)
        db.session.delete(user_drink)
        db.session.commit()
        response_body = {}
        return make_response(jsonify(response_body), 204)

api.add_resource(UserDrinksById, '/user_drinks/<int:id>')


class UserIngredients(Resource):

    def get(self):
        user_ingredients = UserIngredient.query.all()
        response_body = []
        for user_ingredient in user_ingredients:
            # ipdb.set_trace()
            response_body.append(user_ingredient.to_dict())
        return make_response(jsonify(response_body), 200)

    def post(self):
        try:
            data=request.get_json()
            new_user_ingredient = UserIngredient(
                user_id=data.get('user_id'),
                ingredient_id=data.get('ingredient_id')
            )
            db.session.add(new_user_ingredient)
            db.session.commit()
            response_body = new_user_ingredient.to_dict()
            return make_response(jsonify(response_body), 200)
        except ValueError:
            response_body = {'errors': ['validation errors']}
            return make_response(jsonify(response_body), 400)

api.add_resource(UserIngredients, '/user_ingredients')


class UserIngredientsById(Resource):

    def get(self, id):
        user_ingredients = UserIngredient.query.filter(UserIngredient.user_id == id)
        response_body = []
        for user_ingredient in user_ingredients:
            # ipdb.set_trace()
            response_body.append(user_ingredient.to_dict())
        return make_response(jsonify(response_body), 200)

    def delete(self, id):
        user_ingredient = UserIngredient.query.filter(UserIngredient.id == id).first()
        if not user_ingredient:
            return make_response({'error': 'User Ingredient not found'}, 404)
        db.session.delete(user_ingredient)
        db.session.commit()
        response_body = {}
        return make_response(jsonify(response_body), 204)

api.add_resource(UserIngredientsById, '/user_ingredients/<int:id>')




if __name__ == '__main__':
    app.run(port=5555, debug=True)