import json
import subprocess
import tempfile


def write_datafile(
    tshirts: list[str],
    names: list[str],
    surnames: list[str],
    pastas: list[str],
    wines: list[str],
    ages: list[int],
) -> str:
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".dzn")
    file_str = f"""
    tshirt={str(tshirts)};
    name={str(names)};
    surname={str(surnames)};
    pasta={str(pastas)};
    wine={str(wines)};
    age={str(ages)};
    """
    tmp.write(file_str.encode())

    tmp.close()
    return tmp.name


def solve(
    tshirts: list[str],
    names: list[str],
    surnames: list[str],
    pastas: list[str],
    wines: list[str],
    ages: list[int],
) -> list[bool]:
    filename = write_datafile(tshirts, names, surnames, pastas, wines, ages)
    command = f"minizinc app/model/zebra/model.mzn {filename} | tr -d '-'"
    result = subprocess.check_output(command, shell=True, text=True)
    return json.loads(result)
