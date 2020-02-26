# API documentation

> This documentation is to specify the api response with its response json
> The pathes will be aggregated base on the existed router implementation

## `/ingredients`

### `GET /ingredients`

**Private route**  
Get all ingredients, returns a list of ingredient objects.

Response:

```json
[
    {
        "id": "ObjectId",
        "name": "string",
        "spoonId": "int"
    }, ...
]
```

### `GET /ingredients/:id`

**Private route**  
Get the ingredient with by param `:id`, returns the ingredient object found

Response:

```json
{
    "id": "ObjectId",
    "name": "string",
    "spoonId": "int"
}
```

### `POST /ingredients`

**Private route**  
Add a new ingredient to database, returns the newly created ingredient object.

Response:

```json
{
    "id": "ObjectId",
    "name": "string",
    "spoonId": "int"
}
```

### `DELETE /ingredients/:id`

**Private route**  
Delete an ingredient in database, return a 200 status code

Respose: Status 200.
