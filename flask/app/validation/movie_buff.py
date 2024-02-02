from marshmallow import Schema, fields, validate
from app.model.movie_buff.params import (
    members as allowed_members,
    movies as allowed_movies,
    days as allowed_days,
    hours as allowed_hours,
)


class MovieBuffSchema(Schema):
    members = fields.List(
        fields.Str(validate=validate.OneOf(allowed_members)),
        validate=validate.Length(equal=5),
        required=True,
    )
    movies = fields.List(
        fields.Str(validate=validate.OneOf(allowed_movies)),
        validate=validate.Length(equal=5),
        required=True,
    )
    days = fields.List(
        fields.Str(validate=validate.OneOf(allowed_days)),
        validate=validate.Length(equal=5),
        required=True,
    )
    hours = fields.List(
        fields.Int(validate=validate.OneOf(allowed_hours)),
        validate=validate.Length(equal=5),
        required=True,
    )