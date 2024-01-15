from flask import Blueprint, jsonify, request
from app.model.zebra.solver import solve
from app import app
from app.model.zebra.constraints import str_constraints
from minizinc import Instance, Model, Solver

from app.validation.zebra import ZebraSchema

from app.validation.personal_computer import PersonalComputerSchema
from app.model.a_new_personal_computer.constraints import str_constraints

api_blueprint = Blueprint("api_blueprint", __name__)


@api_blueprint.route("/zebra", methods=["POST"])
def zebra():
    try:
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
        for i in range(success_statuses.__len__()):
            response.append(
                {"success": success_statuses[i], "constraint": str_constraints[i]}
            )

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"message": "Validation failed", "error": str(e)}), 400
    
@api_blueprint.route("/personal-computer", methods=["POST"])
def personal_computer ():
    data = request.get_json()
    schema = PersonalComputerSchema()
    user_solution = schema.load(data)
    gecode = Solver.lookup("gecode")
    problem = Model("./app/model/a_new_personal_computer/model.mzn")
    instance = Instance(gecode, problem)

    instance["processor"] = user_solution["processors"]
    instance["price"] = user_solution["prices"]
    instance["monitor"] = user_solution["monitors"]
    instance["hardDisk"] = user_solution["hardDisks"]
    result = instance.solve()
    resultHints = result.solution.hints

    response = []
    for i in range (len(resultHints)):
        response.append(
            {"success": resultHints[i], "constraint": str_constraints[i]}
        )
        
    return jsonify(response), 200