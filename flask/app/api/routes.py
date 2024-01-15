from flask import Blueprint, jsonify, request
from app.model.zebra.solver import solve
from app.model.zebra.constraints import str_constraints

from app.validation.zebra import ZebraSchema

api_blueprint = Blueprint("api_blueprint", __name__)


@api_blueprint.route("/zebra", methods=["POST"])
def zebra():
    data = request.get_json()
    schema = ZebraSchema()
    user_solution = schema.load(data)
    success_statuses = solve(
        user_solution["tshirts"],
        user_solution["names"],
        user_solution["surnames"],
        user_solution["pastas"],
        user_solution["wines"],
        user_solution["ages"],
    )

    response = []
    for i in range(len(success_statuses)):
        response.append(
            {"success": success_statuses[i], "constraint": str_constraints[i]}
        )

    return jsonify(response), 200
