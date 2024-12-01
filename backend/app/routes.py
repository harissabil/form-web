from flask import Blueprint, jsonify, request
from .forms import validate_form

form_bp = Blueprint('form_bp', __name__)


@form_bp.route('/submit', methods=['POST'])
def submit_form():
    data = request.json
    validation_errors = validate_form(data)
    if validation_errors:
        return jsonify({"success": False, "errors": validation_errors}), 400

    return jsonify({"success": True, "data": data}), 200
