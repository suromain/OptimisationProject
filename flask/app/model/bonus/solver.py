from minizinc import Instance, Model, Solver
from app.validation.bonus import Constraint, Comparator
from app.model.bonus.params import personnes, lieux, objets

def create_instance(constraints : list[Constraint]):
    gecode = Solver.lookup("gecode")
    problem = Model("./app/model/bonus/model.mzn")
    instance = Instance(gecode, problem)

    str_constraits = '\n'.join(constraints_to_str(constraint) for constraint in constraints)


    instance.add_string(str_constraits)
    

def get_array_from_element(element : str) -> str:
    if element in personnes: return "personnes" 
    if element in lieux: return "lieux" 
    return "objets" 

def constraints_to_str(constraint : Constraint)-> str:
    return f'constraint exists(sol in SOLUTIONS)({constraint.to_minizinc_constraint("sol", get_array_from_element)});'