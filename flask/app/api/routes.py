from flask import Blueprint, jsonify, request
from app.model.zebra.solver import solve as solve_zebra
from app.model.zebra.constraints import zebra_constraints
from minizinc import MiniZincError

from app.model.a_new_personal_computer.constraints import pc_constraints
from app.model.a_new_personal_computer.solver import solve as solve_pc
from app.validation.personal_computer import PersonalComputerSchema


from app.validation.zebra import ZebraSchema


from app.validation.bonus import (
    CustomCreateSchema,
    CustomCreate,
    CustomGetShortSchema,
    CustomGetDetailedSchema,
    CustomContent,
    CustomAnswer,
    CustomAnswerSchema,
    CustomContentSchema,
)
from app.model.bonus.solver import create_and_solve

from marshmallow import ValidationError

from app.db.db import get_db
import json
from app.model.movie_buff.constraints import movie_buff_constraints
from app.model.movie_buff.solver import solve as solve_movie
from app.validation.movie_buff import MovieBuffSchema


api_blueprint = Blueprint("api_blueprint", __name__)


@api_blueprint.route("/zebra", methods=["POST"])
def zebra():
    try:
        data = request.get_json()
        schema = ZebraSchema()
        user_solution = schema.load(data)
        success_statuses = solve_zebra(
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
                {"success": success_statuses[i], "constraint": zebra_constraints[i]}
            )

        return jsonify(response), 200
    except MiniZincError as e:
        return (
            jsonify(
                {
                    "message": "An error occurred when charging the MiniZinc model",
                    "error": str(e),
                }
            ),
            500,
        )
    except Exception as e:
        print(e)
        return jsonify({"message": "Validation failed", "error": str(e)}), 400


@api_blueprint.route("/personal-computer", methods=["POST"])
def personal_computer():
    try:
        data = request.get_json()
        schema = PersonalComputerSchema()
        user_solution = schema.load(data)
        success_statuses = solve_pc(
            user_solution["processors"],
            user_solution["prices"],
            user_solution["monitors"],
            user_solution["hardDisks"],
        )

        response = []
        for i in range(success_statuses.__len__()):
            response.append(
                {"success": success_statuses[i], "constraint": pc_constraints[i]}
            )

        return jsonify(response), 200
    except MiniZincError as e:
        return (
            jsonify(
                {
                    "message": "An error occurred when charging the MiniZinc model",
                    "error": str(e),
                }
            ),
            500,
        )
    except Exception as e:
        return jsonify({"message": "Validation failed", "error": str(e)}), 400


@api_blueprint.route("/custom-puzzle", methods=["GET"])
def get_all_custom_puzzles():
    db = get_db()
    puzzles = db.execute("SELECT id, name, description FROM custom_puzzle").fetchall()

    puzzles_schema = CustomGetShortSchema(many=True)

    return jsonify(puzzles_schema.dump(puzzles)), 200


custom_create_schema = CustomCreateSchema()


@api_blueprint.route("/custom-puzzle", methods=["POST"])
def create_custom_puzzle():
    json_data = request.get_json()
    if not json_data:
        return {"message": "No input data provided"}, 400
    try:
        data: CustomCreate = custom_create_schema.load(json_data)
    except ValidationError as err:
        return err.messages, 422

    content = {
        "constraints": json_data["constraints"],
        "operands": json_data["operands"],
    }

    db = get_db()

    result = db.execute(
        "INSERT INTO custom_puzzle(name, description, content) VALUES (?,?,?)",
        (data.name, data.description, json.dumps(content)),
    )

    db.commit()

    # create_instance(data.constraints)
    return {"id": result.lastrowid}, 200


custom_get_detailed_schema = CustomGetDetailedSchema()
custom_content_schema = CustomContentSchema()


@api_blueprint.route("/custom-puzzle/<int:id>", methods=["GET"])
def get_details_custom_puzzle(id: int):
    db = get_db()

    puzzle_details = db.execute(
        "SELECT id, name, description, content FROM custom_puzzle WHERE id = ?", (id,)
    ).fetchone()

    if puzzle_details is None:
        return ("No puzzle with this id", 404)

    content = json.loads(puzzle_details["content"])

    puzzle_prepare_response = {
        "id": puzzle_details["id"],
        "name": puzzle_details["name"],
        "description": puzzle_details["description"],
        "constraints": content["constraints"],
        "operands": content["operands"],
    }

    return (puzzle_prepare_response, 200)


@api_blueprint.route("/custom-puzzle/<int:id>", methods=["DELETE"])
def delete_custom_puzzle(id: int):
    db = get_db()
    puzzle_id = db.execute(
        "SELECT id FROM custom_puzzle WHERE id = ?", (id,)
    ).fetchone()

    if puzzle_id is None:
        return ("No puzzle with this id", 404)

    db.execute("DELETE FROM custom_puzzle WHERE id = ?", (id,))

    db.commit()

    return ("", 204)


custom_content_schema = CustomContentSchema()
custom_answer_schema = CustomAnswerSchema()


@api_blueprint.route("/custom-puzzle/<int:id>", methods=["POST"])
def submit_answer_custom_puzzle(id: int):
    json_data = request.get_json()
    if not json_data:
        return {"message": "No input data provided"}, 400
    try:
        data: CustomAnswer = custom_answer_schema.load(json_data)
    except ValidationError as err:
        return err.messages, 422

    db = get_db()

    puzzle_details = db.execute(
        "SELECT id, content FROM custom_puzzle WHERE id = ?", (id,)
    ).fetchone()

    if puzzle_details is None:
        return ("No puzzle with this id", 404)

    print(f"Solving the puzzle {id}")

    content: CustomContent = custom_content_schema.load(
        json.loads(puzzle_details["content"])
    )

    result = create_and_solve(answer=data, content=content)
    print(f"result : {result}")

    return ({"correct": result}, 200)


@api_blueprint.route("/movie-buff", methods=["POST"])
def movie_buff():
    try:
        data = request.get_json()
        schema = MovieBuffSchema()
        user_solution = schema.load(data)
        success_statuses = solve_movie(
            user_solution["members"],
            user_solution["movies"],
            user_solution["days"],
            user_solution["hours"],
        )

        response = []
        for i in range(success_statuses.__len__()):
            response.append(
                {
                    "success": success_statuses[i],
                    "constraint": movie_buff_constraints[i],
                }
            )

        return jsonify(response), 200
    except MiniZincError as e:
        return (
            jsonify(
                {
                    "message": "An error occurred when charging the MiniZinc model",
                    "error": str(e),
                }
            ),
            500,
        )
    except Exception as e:
        return jsonify({"message": "Validation failed", "error": str(e)}), 400
