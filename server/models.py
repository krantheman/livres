from . import db
from datetime import datetime


class Book(db.Model):
    bookID = db.Column(db.String(10), primary_key=True)
    title = db.Column(db.String(50))
    authors = db.Column(db.String(50))
    average_rating = db.Column(db.String(10))
    isbn = db.Column(db.String(15))
    isbn13 = db.Column(db.String(15))
    language_code = db.Column(db.String(10))
    num_pages = db.Column(db.String(10))
    ratings_count = db.Column(db.String(10))
    text_reviews_count = db.Column(db.String(10))
    publication_date = db.Column(db.String(15))
    publisher = db.Column(db.String(50))
    stock = db.Column(db.Integer, default=1)
    transactions = db.relationship('Transaction', backref='book', lazy=True)


class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    phone_no = db.Column(db.Integer, unique=True, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    address = db.Column(db.String(100), nullable=False)
    transactions = db.relationship('Transaction', backref='member', lazy=True)


class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    borrow_date = db.Column(db.Date, nullable=False, default=datetime.today())
    return_date = db.Column(db.Date)
    book_id = db.Column(db.String(10), db.ForeignKey(
        'book.bookID'), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey(
        'member.id'), nullable=False)
