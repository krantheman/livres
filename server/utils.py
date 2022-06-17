from datetime import date


def calculate_debt(borrow_date):
    today = date.today()
    days = (today - borrow_date).days
    if days <= 30:
        return 100
    return round(100 + (days - 30)/7 * 100)


def row2dict(row):
    d = {}
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))

    return d
