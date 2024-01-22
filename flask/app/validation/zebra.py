from marshmallow import Schema, fields, validate
from app.model.zebra.params import (
    tshirts as allowed_tshirts,
    names as allowed_names,
    surnames as allowed_surnames,
    pastas as allowed_pastas,
    wines as allowed_wines,
    ages as allowed_ages,
)


class ZebraSchema(Schema):
    tshirts = fields.List(
        fields.Str(validate=validate.OneOf(allowed_tshirts)),
        validate=validate.Length(equal=5),
        required=True,
    )
    names = fields.List(
        fields.Str(validate=validate.OneOf(allowed_names)),
        validate=validate.Length(equal=5),
        required=True,
    )
    surnames = fields.List(
        fields.Str(validate=validate.OneOf(allowed_surnames)),
        validate=validate.Length(equal=5),
        required=True,
    )
    pastas = fields.List(
        fields.Str(validate=validate.OneOf(allowed_pastas)),
        validate=validate.Length(equal=5),
        required=True,
    )
    wines = fields.List(
        fields.Str(validate=validate.OneOf(allowed_wines)),
        validate=validate.Length(equal=5),
        required=True,
    )
    ages = fields.List(
        fields.Int(validate=validate.OneOf(allowed_ages)),
        validate=validate.Length(equal=5),
        required=True,
    )
