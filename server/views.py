from datetime import date, datetime
from flask import Blueprint, jsonify, request
from sqlalchemy import or_
from sqlalchemy.orm import joinedload
from server.utils import calculate_debt, row2dict
from . import db
from .models import Book, Member, Transaction
from dateutil import parser


book_blueprint = Blueprint("book", __name__)


@book_blueprint.route("/book", methods=["POST"])
def add_book():
    book_data = request.get_json()
    new_book = Book(**book_data)
    db.session.add(new_book)
    db.session.commit()
    return book_data, 201


@book_blueprint.route("/book/<id>")
def get_book(id):
    book = Book.query.get(id)
    if not book:
        return jsonify({"message": "Book not found"})
    book_as_dict = book.__dict__
    del book_as_dict["_sa_instance_state"]
    return jsonify({"book": book_as_dict})


@book_blueprint.route("/books")
def get_books():
    books = []
    book_list = Book.query.all()
    for book in book_list:
        book_as_dict = book.__dict__
        del book_as_dict["_sa_instance_state"]
        books.append(book_as_dict)
    return jsonify({"books": books})


@book_blueprint.route("/book/<id>/stock", methods=["PUT"])
def update_book_stock(id):
    if not request.json:
        return "No stock data provided", 400
    book = Book.query.get(id)
    book.stock = request.json["stock"]
    db.session.commit()
    return {"stock": book.stock}


@book_blueprint.route("/book/<id>", methods=["DELETE"])
def delete_book(id):
    book = Book.query.get(id)
    if not book:
        return "Book does not exist", 404
    db.session.delete(book)
    db.session.commit()
    return "Book deleted successfully"


member_blueprint = Blueprint("member", __name__)


@member_blueprint.route("/member", methods=["POST"])
def add_member():
    member_data = request.get_json()
    new_member = Member(**member_data)
    db.session.add(new_member)
    db.session.commit()
    return member_data, 201


@member_blueprint.route("/members")
def get_members():
    members = []
    member_list = Member.query.options(joinedload(Member.transactions)).all()
    for member in member_list:
        if member.debt > 0:
            debt = 0
            for transaction in member.transactions:
                if not transaction.return_date:
                    debt += calculate_debt(transaction.borrow_date)
            member.debt = debt
        member_as_dict = member.__dict__
        del member_as_dict["transactions"]
        del member_as_dict["_sa_instance_state"]
        members.append(member_as_dict)
    return jsonify({"members": members})


@member_blueprint.route("/member")
def get_member():
    if not request.args:
        return "No member data provided", 400
    member = Member.query.filter(
        or_(Member.email == request.args.get("email"), Member.phone_no == request.args.get("phone_no"))).first()
    if member:
        member_as_dict = member.__dict__
        del member_as_dict["_sa_instance_state"]
        return jsonify({"member": member_as_dict})
    return jsonify({"message": "Member does not exist"})


@member_blueprint.route("/member/<id>", methods=["PUT"])
def edit_member(id):
    if not request.json:
        return "No member data provided", 400
    member = Member.query.get(id)
    member.name = request.json["name"]
    member.address = request.json["address"]
    member_as_dict = member.__dict__.copy()
    del member_as_dict["_sa_instance_state"]
    db.session.commit()
    return {"member": member_as_dict}


@member_blueprint.route("/member/<id>", methods=["DELETE"])
def delete_member(id):
    member = Member.query.get(id)
    if not member:
        return "Member does not exist", 404
    db.session.delete(member)
    db.session.commit()
    return "Member deleted successfully"


transaction_blueprint = Blueprint("transaction", __name__)


@transaction_blueprint.route("/transaction", methods=["POST"])
def create_transaction():
    transaction_data = request.get_json()
    transaction_data["borrow_date"] = parser.parse(
        transaction_data["borrow_date"])
    member = Member.query.get(transaction_data["member_id"])
    member.debt = 1
    book = Book.query.get(transaction_data["book_id"])
    book.stock -= 1
    new_transaction = Transaction(**transaction_data)
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify({"transaction": transaction_data}), 201


@transaction_blueprint.route("/transactions")
def get_transactions():
    transactions = []
    transaction_list = Transaction.query.options(
        joinedload(Transaction.book), joinedload(Transaction.member)).all()
    for transaction in transaction_list:
        transaction_as_dict = transaction.__dict__
        del transaction_as_dict["_sa_instance_state"]
        transaction_as_dict["member"] = row2dict(transaction.member)
        transaction_as_dict["book"] = row2dict(transaction.book)
        transactions.append(transaction_as_dict)
    return jsonify({"transactions": transactions})


@transaction_blueprint.route("/transaction/<id>", methods=["PUT"])
def update_transaction(id):
    if not request.json:
        return "No transaction data provided", 400
    transaction = Transaction.query.get(id)
    member = Member.query.get(transaction.member_id)
    book = Book.query.get(transaction.book_id)

    new_borrow_date = parser.parse(request.json["borrow_date"])
    new_return_date = parser.parse(
        request.json["return_date"]) if request.json["return_date"] else None
    old_return_date = transaction.return_date

    if new_return_date:
        if not old_return_date:
            book.stock += 1
    else:
        if old_return_date:
            member.debt = 1
            book.stock -= 1
    transaction.return_date = new_return_date
    transaction.borrow_date = new_borrow_date

    transaction_as_dict = row2dict(transaction)
    db.session.commit()
    return {"transaction": transaction_as_dict}


@ transaction_blueprint.route("/transaction/<id>", methods=["DELETE"])
def delete_transaction(id):
    transaction = Transaction.query.get(id)
    if not transaction:
        return "Transaction does not exist", 404
    if not transaction.return_date:
        book = Book.query.get(transaction.book_id)
        book.stock += 1
    db.session.delete(transaction)
    db.session.commit()
    return "Transaction deleted successfully"
