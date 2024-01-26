from marshmallow import Schema, fields, validate, post_load
from enum import StrEnum
from typing import Optional, Callable
from app.model.bonus.params import (
    personnes as allowed_personnes, 
    lieux as allowed_lieux, 
    objets as allowed_objets 
)


class Comparator(StrEnum):
    EQ = "EQ"
    NEQ = "NEQ"

    def to_minizinc_constraint(self)->str:
        match self:
            case Comparator.EQ:
                return "=="
                
            case Comparator.NEQ:
                return "!="

class Connector(StrEnum):
    AND = "AND"
    OR = "OR"
    IMPLIES = "IMPLIES"

    def to_minizinc_constraint(self)->str:
        match self:
            case Connector.AND:
                return "/\\"
            case Connector.OR:
                return "\/"
            case Connector.IMPLIES:
                return "->"
            

class Atom():
    def __init__(self, comparator : Comparator, operand : str):
        self.comparator = comparator
        self.operand = operand

class AtomSchema(Schema):
    comparator = fields.Enum(Comparator)
    operand = fields.String()
    @post_load
    def make_atom(self, data, **kwargs):
        return Atom(**data)


class Constraint():
    def __init__(self, negative : bool, atom : Atom, next: Optional['Next']):
        self.negative = negative
        self.atom = atom
        self.next = next
    
    def to_minizinc_constraint(self, var_name : str, reverse_array_searcher : Callable[str, str]) -> str:
        next_value_str = ""
        if self.next is not None:
            next_value_str = self.next.to_minizinc_constraint(var_name, reverse_array_searcher)
        
        return f'{"not" if self.negative else ""} ({reverse_array_searcher(self.atom.operand)}[{var_name}] {self.atom.comparator.to_minizinc_constraint()} {self.atom.operand} {next_value_str})'

class Next():
    def __init__(self, connector : Connector, constraint : Constraint):
        self.connector = connector
        self.constraint = constraint
    
    def to_minizinc_constraint(self, var_name : str, reverse_array_searcher : Callable[str, str]):
        return f"{self.connector.to_minizinc_constraint()} {self.constraint.to_minizinc_constraint(var_name, reverse_array_searcher)}"


class NextSchema(Schema):
    connector = fields.Enum(Connector)
    constraint = fields.Nested('ConstraintSchema')
    
    @post_load
    def make_next(self, data, **kwargs):
        return Next(**data)


class ConstraintSchema(Schema):
    negative = fields.Boolean()
    atom = fields.Nested(AtomSchema)
    next = fields.Nested(NextSchema, required=False, allow_none=True)

    @post_load
    def make_constraint(self, data, **kwargs):
        return Constraint(**data)


class CustomAnwserSchema(Schema):
    personnes = fields.List(
        fields.Str(validate=validate.OneOf(allowed_personnes)),
        validate=validate.Length(equal=3),
        required=True
    )

    lieux = fields.List(
        fields.Str(validate=validate.OneOf(allowed_lieux)),
        validate=validate.Length(equal=3),
        required=True
    )

    objets = fields.List(
        fields.Str(validate=validate.OneOf(allowed_objets)),
        validate=validate.Length(equal=3),
        required=True
    )

class CustomGetShortSchema(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    description = fields.Str(required=False)

class CustomCreate():
    def __init__(self, name: str, description : str, constraints : list[Constraint]):
        self.name = name
        self.description = description
        self.constraints = constraints
        

class CustomGetDetailedSchema(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    description = fields.Str(required=False)
    constraints = fields.List(
            fields.Nested(ConstraintSchema), 
            required=True)    


class CustomCreateSchema(Schema):
    name = fields.Str(required=True)
    description = fields.Str(required=False)
    constraints = fields.List(
            fields.Nested(ConstraintSchema), 
            required=True)    
    
    # answer = fields.Nested(BonusAnwser)
    
    @post_load
    def make_CustomCreate(self, data, **kwargs):
        return CustomCreate(**data)

    
        