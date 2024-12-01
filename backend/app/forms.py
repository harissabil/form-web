import re


def validate_form(data):
    errors = {}

    # Validation rules
    if not data.get('name') or not re.match(r'^[a-zA-Z\s]+$', data['name']):
        errors['name'] = "Name must only contain alphabets."

    if not data.get('phone') or not re.match(r'^\d+$', data['phone']):
        errors['phone'] = "Phone must only contain numbers."

    if len(data.get('password', '')) < 8:
        errors['password'] = "Password must be at least 8 characters."

    if data.get('email') and '@' not in data['email']:
        errors['email'] = "Invalid email address."

    if not data.get('age') or not data['age'].isdigit() or int(data['age']) < 18:
        errors['age'] = "Age must be a number and at least 18."

    return errors
