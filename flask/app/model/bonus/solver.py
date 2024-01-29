from minizinc import Instance, Model, Solver, Result, Status
from app.validation.bonus import Constraint, Comparator, CustomAnswser
from app.model.bonus.params import personnes, lieux, objets


def create_and_solve(constraints : list[Constraint], answer : CustomAnswser) -> bool:
    

    instance : Instance = create_instance(constraints)
    
    instance["personnes"] = answer.personnes
    instance["lieux"] = answer.lieux
    instance["objets"] = answer.objets

    result : Result = instance.solve()

    return result.status == Status.SATISFIED

def create_instance(constraints : list[Constraint]) -> Instance:
    gecode = Solver.lookup("gecode")
    problem = Model("./app/model/bonus/model.mzn")

    constraints_str = "\n".join([constraints_to_str(constraint) for constraint in constraints])

    print(f"Using the constraints : \n{constraints_str}")
    
    problem.add_string(constraints_str)

    instance = Instance(gecode, problem)

    return instance
    

def get_array_from_element(element : str) -> str:
    if element in personnes: return "personnes" 
    if element in lieux: return "lieux" 
    return "objets" 

def constraints_to_str(constraint : Constraint)-> str:
    return f'constraint exists(sol in SOLUTIONS)({constraint.to_minizinc_constraint("sol", get_array_from_element)});'