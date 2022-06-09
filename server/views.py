from flask import Blueprint, jsonify, request
from . import db
from .models import Book

books_blueprint = Blueprint("books", __name__)


@books_blueprint.route("/book/add", methods=["POST"])
def add_book():
    book_data = request.get_json()
    new_book = Book(**book_data)
    db.session.add(new_book)
    db.session.commit()
    return book_data, 201


@books_blueprint.route("/books")
def books():
    books = []
    book_list = Book.query.all()

    for book in book_list:
        book_as_dict = book.__dict__
        del book_as_dict["_sa_instance_state"]
        books.append(book_as_dict)

    return jsonify({"books": books})
