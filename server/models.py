from . import db


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