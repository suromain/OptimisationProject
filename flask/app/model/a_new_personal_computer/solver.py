import os

from minizinc import Instance, Model, Solver


def solve(
    processors: list[int], prices: list[int], monitors: list[int], hard_disks: list[int]
) -> list[bool]:
    print("Solving...")

    gecode = Solver.lookup("gecode")
    problem = Model(os.getcwd() + "/app/model/a_new_personal_computer/model.mzn")

    instance = Instance(gecode, problem)
    instance["processor"] = processors
    instance["price"] = prices
    instance["monitor"] = monitors
    instance["hardDisk"] = hard_disks

    result = instance.solve()

    return result.solution.constraints
