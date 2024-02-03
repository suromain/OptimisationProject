import os

from minizinc import Instance, Model, Solver


def solve(
        members: list[str],
        movies: list[str],
        days: list[str],
        hours: list[int],
) -> list[bool]:
    print("Solving...")

    gecode = Solver.lookup("gecode")
    problem = Model(os.getcwd() + "/app/model/movie_buff/model.mzn")

    instance = Instance(gecode, problem)
    instance["members"] = members
    instance["movies"] = movies
    instance["days"] = days
    instance["hours"] = hours

    result = instance.solve()

    return result.solution.hints
