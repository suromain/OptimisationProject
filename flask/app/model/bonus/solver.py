from minizinc import Instance, Model, Solver, Result, Status
from app.validation.bonus import Constraint, Comparator, CustomAnswer, CustomContent, OperandType
from app.model.bonus.params import personnes, lieux, objets


def create_and_solve(content : CustomContent, answer : CustomAnswer) -> bool:
    
    instance : Instance = create_instance(content)
    
    instance["personnes"] = answer.personnes
    instance["lieux"] = answer.lieux
    instance["objets"] = answer.objets

    result : Result = instance.solve()

    return result.status == Status.SATISFIED

def create_header(content : CustomContent) -> str:
    header = "enum PERSONNE = { " + ', '.join([name for name in content.operands.names]) + "}; \n"
    header += "enum LIEU = { " + ', '.join([lieu for lieu in content.operands.places]) + "}; \n"
    header += "enum OBJET = { " + ', '.join([objet for objet in content.operands.objects]) + "}; \n"

    header += "array[SOLUTIONS] of var PERSONNE: personnes;\n"
    header += "array[SOLUTIONS] of var LIEU: lieux;\n"
    header += "array[SOLUTIONS] of var OBJET: objets;\n"

    header += "constraint all_different(personnes); \n"
    header += "constraint all_different(lieux); \n"
    header += "constraint all_different(objets); \n"

    return header

def create_instance(content : CustomContent) -> Instance:
    gecode = Solver.lookup("gecode")
    problem = Model("./app/model/bonus/model.mzn")

    header = create_header(content)
    constraints_str = "\n".join([constraints_to_str(constraint) for constraint in content.constraints])

    print(f"Using the constraints : \n{constraints_str}")
    print(f"Using the header : \n{header}")
    
    problem.add_string(header)
    problem.add_string(constraints_str)

    instance = Instance(gecode, problem)

    return instance
    
def constraints_to_str(constraint : Constraint)-> str:
    return f'constraint exists(sol in SOLUTIONS)({constraint.to_minizinc_constraint("sol")});'