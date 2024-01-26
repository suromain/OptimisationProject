from flask import Blueprint, jsonify, request
from app.model.zebra.solver import solve
from app.model.zebra.constraints import str_constraints
from minizinc import Instance, Model, Solver

from app.validation.zebra import ZebraSchema

from app.validation.personal_computer import PersonalComputerSchema
from app.model.a_new_personal_computer.constraints import str_constraints

from app.validation.bonus import CustomCreateSchema, CustomCreate, CustomGetShortSchema, CustomGetDetailedSchema, ConstraintSchema, Constraint, CustomAnswser, CustomAnwserSchema
from app.model.bonus.solver import create_and_solve

from marshmallow import ValidationError

from app.db.db import get_db
import json 

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



@api_blueprint.route("/custom-puzzle", methods=["GET"])
def get_all_custom_puzzles():

    db = get_db()
    puzzles = db.execute(
        'SELECT id, name, description FROM custom_puzzle'
    ).fetchall()

    puzzles_schema = CustomGetShortSchema(many=True)
    
    return jsonify(puzzles_schema.dump(puzzles)), 200


custom_create_schema = CustomCreateSchema()

@api_blueprint.route("/custom-puzzle", methods=["POST"])
def create_custom_puzzle():
    json_data = request.get_json()
    if not json_data:
        return {"message": "No input data provided"}, 400
    try:
        data : CustomCreate = custom_create_schema.load(json_data)
    except ValidationError as err:
        return err.messages, 422 
    
    db = get_db()
    result = db.execute(
        'INSERT INTO custom_puzzle(name, description, content) VALUES (?,?,?)', (data.name, data.description, json.dumps(json_data['constraints']))
    )
    db.commit()
    
    # create_instance(data.constraints)
    return {"id" : result.lastrowid}, 200
    

custom_get_detailed_schema = CustomGetDetailedSchema()

@api_blueprint.route("/custom-puzzle/<int:id>", methods=["GET"])
def get_details_custom_puzzle(id : int):
    db = get_db()
    
    puzzle_details = db.execute(
        'SELECT id, name, description, content FROM custom_puzzle WHERE id = ?', (id,)
        ).fetchone()
    
    if puzzle_details is None:
        return ("No puzzle with this id", 404)

    puzzle_response = custom_get_detailed_schema.dump(puzzle_details)
    puzzle_response['constraints'] = json.loads(puzzle_details['content'])
    return (puzzle_response, 200)


@api_blueprint.route("/custom-puzzle/<int:id>", methods=["DELETE"])
def delete_custom_puzzle(id : int):
    db = get_db()
    puzzle_id = db.execute(
        'SELECT id FROM custom_puzzle WHERE id = ?', (id,)
    ).fetchone()

    if puzzle_id is None:
        return ("No puzzle with this id", 404)


    db.execute(
        'DELETE FROM custom_puzzle WHERE id = ?', (id,)
    )

    db.commit()
    
    return ("", 204)

constraint_schema = ConstraintSchema()
custom_answer_schema = CustomAnwserSchema()

@api_blueprint.route("/custom-puzzle/<int:id>", methods=["POST"])
def submit_anwser_custom_puzzle(id : int):
    json_data = request.get_json()
    if not json_data:
        return {"message": "No input data provided"}, 400
    try:
        data : CustomAnswser = custom_answer_schema.load(json_data)
    except ValidationError as err:
        return err.messages, 422 

    db = get_db()
    puzzle_details = db.execute(
    'SELECT id, content FROM custom_puzzle WHERE id = ?', (id,)
    ).fetchone()
    
    if puzzle_details is None:
        return ("No puzzle with this id", 404)
    
    constraints : list[Constraint] = constraint_schema.load(json.loads(puzzle_details['content']), many=True)

    return ({"correct" : create_and_solve(answer=data, constraints=constraints)}, 200)
        
