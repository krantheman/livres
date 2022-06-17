from datetime import date


def calculate_debt(borrow_date):
    today = date.today()
    days = (today - borrow_date.date()).days
    if days <= 30:
        return 100
    return round(100 + (days - 30)/7 * 100)
