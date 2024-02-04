import os

from minizinc import Instance, Model, Solver


def solve(
        members: list[str],
        movies: list[str],
        days: list[str],
        hours: list[int],
) -> list[bool]:

    gecode = Solver.lookup("gecode")
    problem = Model(os.getcwd() + "/app/model/movie_buff/model.mzn")

    instance = Instance(gecode, problem)
    instance["member"] = members
    instance["movie"] = movies
    instance["day"] = days
    instance["hour"] = hours

    result = instance.solve()

    return result.solution.hints
