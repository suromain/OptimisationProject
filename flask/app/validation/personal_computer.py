from marshmallow import Schema, fields, validate
from app.model.a_new_personal_computer.params import (
    processors as allowed_processors,
    prices as allowed_prices,
    monitors as allowed_monitors,
    hardDisks as allowed_hardDisks,
)


class PersonalComputerSchema(Schema):
    processors = fields.List(
        fields.Int(validate=validate.OneOf(allowed_processors)),
        validate=validate.Length(equal=5),
        required=True,
    )
    prices = fields.List(
        fields.Int(validate=validate.OneOf(allowed_prices)),
        validate=validate.Length(equal=5),
        required=True,
    )
    monitors = fields.List(
        fields.Int(validate=validate.OneOf(allowed_monitors)),
        validate=validate.Length(equal=5),
        required=True,
    )
    hardDisks = fields.List(
        fields.Int(validate=validate.OneOf(allowed_hardDisks)),
        validate=validate.Length(equal=5),
        required=True,
    )
    
    andrews_choice = fields.Int(
        validate=validate.Range(1, 5)
    )