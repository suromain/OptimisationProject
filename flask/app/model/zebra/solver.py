import os

from minizinc import Instance, Model, Solver


def solve(
        tshirts: list[str],
        names: list[str],
        surnames: list[str],
        pastas: list[str],
        wines: list[str],
        ages: list[int],
) -> list[bool]:
    print("Solving...")

    gecode = Solver.lookup("gecode")
    problem = Model(os.getcwd() + "/flask/app/model/zebra/model.mzn")

    instance = Instance(gecode, problem)
    instance["tshirt"] = tshirts
    instance["name"] = names
    instance["surname"] = surnames
    instance["pasta"] = pastas
    instance["wine"] = wines
    instance["age"] = ages

    result = instance.solve()

    return result.solution.constraints
