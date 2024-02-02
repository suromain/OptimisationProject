from marshmallow import Schema, fields, validate, post_load, ValidationError, validates
from enum import Enum
from typing import Optional, Callable

class OperandType(Enum):
    PERSON = "PERSON"
    PLACE = "PLACE"
    OBJECT = "OBJECT"

    
    def to_minizinc_constraint(self) -> str:
        match self:
            case OperandType.PERSON:
                return "personnes"
            case OperandType.PLACE:
                return "lieux"
            case default: 
                return "objets"


class Comparator(Enum):
    EQ = "EQ"
    NEQ = "NEQ"

    def to_minizinc_constraint(self)->str:
        match self:
            case Comparator.EQ:
                return "=="
                
            case Comparator.NEQ:
                return "!="

class Connector(Enum):
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

class OperandList():
    def __init__(self, names : list[str], objects : list[str], places : list[str]):
        self.names = names
        self.objects = objects
        self.places = places

class OperandListSchema(Schema):
    names = fields.List(fields.Str(), validate=validate.Length(3), required=True)
    objects = fields.List(fields.Str(), validate=validate.Length(3), required=True)
    places = fields.List(fields.Str(), validate=validate.Length(3), required=True)

    @validates("names")
    @validates("places")
    @validates("objects")
    def no_duplicates(self, value : list[str]):
        if len(value) != len(set(value)):
            raise ValidationError("Il ne doit pas y avoir de valeur dupliquée.") 
    
    @post_load
    def make_operand_list(self, data, **kwargs):
        return OperandList(**data)


class Atom():
    def __init__(self, comparator : Comparator, operand : str, operand_type : OperandType):
        self.comparator = comparator
        self.operand = operand
        self.operand_type = operand_type

class AtomSchema(Schema):
    
    comparator = fields.Enum(Comparator, required=True)
    operand = fields.String(required=True)
    operand_type = fields.Enum(OperandType, required=True)

    @post_load
    def make_atom(self, data, **kwargs):
        return Atom(**data)


class Constraint():
    def __init__(self, negative : bool, atom : Atom, next: Optional['Next']):
        self.negative = negative
        self.atom = atom
        self.next = next
    
    def to_minizinc_constraint(self, var_name : str) -> str:
        next_value_str = ""
        if self.next is not None:
            next_value_str = self.next.to_minizinc_constraint(var_name)
        
        return f'{"not" if self.negative else ""} ({self.atom.operand_type.to_minizinc_constraint()}[{var_name}] {self.atom.comparator.to_minizinc_constraint()} {self.atom.operand} {next_value_str})'

class Next():
    def __init__(self, connector : Connector, constraint : Constraint):
        self.connector = connector
        self.constraint = constraint
    
    def to_minizinc_constraint(self, var_name : str):
        return f"{self.connector.to_minizinc_constraint()} {self.constraint.to_minizinc_constraint(var_name)}"


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


class CustomAnswer():
    def __init__(self, personnes : list[str], lieux : list[str], objets : list[str]):
        self.personnes = personnes
        self.lieux = lieux
        self.objets = objets

class CustomAnswerSchema(Schema):
    personnes = fields.List(
        fields.Str(),
        validate=validate.Length(equal=3),
        required=True
    )

    lieux = fields.List(
        fields.Str(),
        validate=validate.Length(equal=3),
        required=True
    )

    objets = fields.List(
        fields.Str(),
        validate=validate.Length(equal=3),
        required=True
    )

    @post_load
    def make_answer(self, data, **kwargs):
        return CustomAnswer(**data)

class CustomContent():
    def __init__(self, constraints : list[Constraint], operands : OperandList):
        self.constraints = constraints
        self.operands = operands

class CustomContentSchema(Schema):
    constraints = fields.List(fields.Nested(ConstraintSchema)) 
    operands = fields.Nested(OperandListSchema, required=True)  

    @post_load
    def make_content(self, data, **kwargs):
        return CustomContent(**data)

class CustomGetShortSchema(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    description = fields.Str(required=False)

class CustomCreate():
    def __init__(self, name: str, description : str, constraints : list[Constraint], operands : OperandList):
        self.name = name
        self.description = description
        self.constraints = constraints
        self.operands = operands
        

class CustomCreateSchema(Schema):
    name = fields.Str(required=True)
    description = fields.Str(required=False)
    constraints = fields.List(
            fields.Nested(ConstraintSchema), 
            required=True) 
    operands = fields.Nested(OperandListSchema, required=True)
    
    @post_load
    def make_CustomCreate(self, data, **kwargs):
        return CustomCreate(**data)

    
class CustomGetDetailedSchema(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)
    description = fields.Str(required=False)
    constraints = fields.List(fields.Nested(ConstraintSchema)) 
    operands = fields.Nested(OperandListSchema, required=True)  
