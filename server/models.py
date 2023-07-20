from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String)

    # Relationships
    user_drinks = db.relationship('UserDrink', back_populates='user', cascade='all, delete-orphan')
    user_ingredients = db.relationship('UserIngredient', back_populates='user', cascade='all, delete-orphan')

    drinks = association_proxy('user_drinks', 'drink', creator=lambda d: UserDrink(drink=d))
    ingredients = association_proxy('user_ingredients', 'ingredient', creator=lambda i: UserIngredient(ingredient=i))

    # Serializer
    serialize_rules = ('-user_drinks', 'user_ingredients')


class Drink(db.Model, SerializerMixin):
    __tablename__ = 'drinks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    image = db.Column(db.String)
    instructions = db.Column(db.String)

    # Relationships
    user_drinks = db.relationship('UserDrink', back_populates='drink', cascade='all, delete-orphan')
    drink_ingredients = db.relationship('DrinkIngredient', back_populates='drink', cascade='all, delete-orphan')

    users = association_proxy('user_drinks', 'user', creator=lambda u: UserDrink(user=u))
    ingredients = association_proxy('drink_ingredients', 'ingredient', creator=lambda i: DrinkIngredient(ingredient=i))

    # Serializer
    serialize_rules = ('-user_drinks', '-drink_ingredients')

    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'name': self.name,
    #         'image': self.image,
    #         'ingredients': [drink_ingredient.to_dict() for drink_ingredient in self.ingredients]
    #     }


class Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)

    # Relationships
    user_ingredients = db.relationship('UserIngredient', back_populates='ingredient', cascade='all, delete-orphan')
    drink_ingredients = db.relationship('DrinkIngredient', back_populates='ingredient', cascade='all, delete-orphan')
    
    users = association_proxy('user_ingredients', 'user', creator=lambda u: UserIngredient(user=u))
    drinks = association_proxy('drink_ingredients', 'drink', creator=lambda d: DrinkIngredient(drink=d))

    # Serializer
    serialize_rules = ('-user_ingredients', '-drink_ingredients')

    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'name': self.name
    #     }


class DrinkIngredient(db.Model, SerializerMixin):
    __tablename__ = 'drink_ingredients'

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.String)

    drink_id = db.Column(db.Integer, db.ForeignKey('drinks.id'))
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))

    # Relationships
    drink = db.relationship('Drink', back_populates='drink_ingredients', cascade='all')
    ingredient = db.relationship('Ingredient', back_populates='drink_ingredients', cascade='all')

    # Serializer
    serialize_rules = ('-ingredient', '-drink')

    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'ingredient': self.ingredient.to_dict(),
    #         'quantity': self.quantity
    #     }


class UserDrink(db.Model, SerializerMixin):
    __tablename__ = 'user_drinks'

    id = db.Column(db.Integer, primary_key=True)

    drink_id = db.Column(db.Integer, db.ForeignKey('drinks.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Relationships
    drink = db.relationship('Drink', back_populates='user_drinks')
    user = db.relationship('User', back_populates='user_drinks')

    # Serializer
    serialize_rules = ('-drink', '-user')


class UserIngredient(db.Model, SerializerMixin):
    __tablename__ = 'user_ingredients'

    id = db.Column(db.Integer, primary_key=True)

    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Relationships
    ingredient = db.relationship('Ingredient', back_populates='user_ingredients')
    user = db.relationship('User', back_populates='user_ingredients')

    # Serializer
    serialize_rules = ('-user',)